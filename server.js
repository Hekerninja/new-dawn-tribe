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

// Create a Nodemailer transporter
// If you have a local SMTP server (like MailHog) running on port 1025, it will use that.
// Otherwise, it will log the email to the console (perfect for local testing).
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '1025'),
  secure: false, // true for 465, false for other ports
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
    from: process.env.SMTP_FROM || 'New Dawn Tribe <noreply@localhost>',
    to: process.env.SMTP_TO || 'newdawntribe@gmail.com', // Your receiving email
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
    // Attempt to send
    // If no SMTP server is running, this will fail, and we catch it to log locally
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully via SMTP!');
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.warn('⚠️ SMTP server not found or error occurred. Logging email locally instead.');
    console.log('--- LOCAL EMAIL LOG ---');
    console.log(`To: ${mailOptions.to}`);
    console.log(`From: ${mailOptions.from}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`Body:\n${mailOptions.html}`);
    console.log('-----------------------');
    
    // Return success anyway since we "processed" the request locally
    return res.status(200).json({ message: 'Email processed (logged locally)' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Waiting for email requests...');
});