import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import emailjs from '@emailjs/browser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware — restrict CORS to known origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.ALLOWED_ORIGIN,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server requests (no origin) and listed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '10kb' }));

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/send-email', limiter);

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  const { from_name, from_email, message, to_name } = req.body;

  // Validate required fields
  if (!from_name || !from_email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(from_email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  // Validate message length
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message is too long.' });
  }

  try {
    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

    // Check if credentials are configured
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS credentials not configured on server');
      return res.status(500).json({ error: 'Email service not configured.' });
    }

    const templateParams = {
      from_name,
      from_email,
      message,
      to_name: to_name || 'New Dawn Tribe'
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

    console.log('Email sent successfully.');
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('EmailJS Error:', error);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});