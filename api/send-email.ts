import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Check if API key is present
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing in environment variables.');
    return res.status(500).json({ message: 'Server configuration error: API key missing' });
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
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('❌ Error sending email via Resend:', error);
    return res.status(500).json({ 
      message: 'Failed to send message', 
      error: error.message 
    });
  }
}