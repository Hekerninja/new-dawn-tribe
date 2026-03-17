import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure Nodemailer for Papercut SMTP
// Papercut defaults to localhost:25
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '25'),
  secure: false, // Papercut usually uses non-secure on port 25
  auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
});

// API Route
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || 'New Dawn Tribe <noreply@papercut>',
    to: process.env.SMTP_TO || 'newdawntribe@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via Papercut!');
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('❌ Error sending email via Papercut:', error.message);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Connected to Papercut SMTP on localhost:25');
});