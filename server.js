import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Initialize Resend only if the key exists
if (!process.env.RESEND_API_KEY) {
  console.error('CRITICAL: RESEND_API_KEY is missing. Server cannot send emails.');
  // In a production environment, you might want to exit here to prevent running without security
  // process.exit(1); 
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Security: Rate Limiting
// Limit requests to 10 per minute per IP to prevent spam/abuse
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors());
app.use(express.json());

// Apply rate limiting to the API route
app.use('/api', limiter);

// API Route
app.post('/api/send-email', async (req, res) => {
  // Double-check API key presence at runtime
  if (!resend) {
    return res.status(500).json({ message: 'Server configuration error: Email service unavailable.' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const data = await resend.emails.send({
      from: 'New Dawn Tribe <onboarding@resend.dev>',
      to: ['newdawntribe@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log('✅ Email sent successfully via Resend!');
    return res.status(200).json({ success: true, id: data.id });
  } catch (error: any) {
    // Log error internally but do not expose detailed error messages to the client
    console.error('❌ Error sending email via Resend:', error.message);
    return res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Using Resend for email delivery.');
  console.log('Rate limiting enabled: 10 requests per minute per IP.');
});