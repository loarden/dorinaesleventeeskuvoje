import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, count } = req.body;

  // Validate input
  if (!name || !count) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create transporter with environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const timestamp = new Date().toLocaleString('hu-HU');
    const emailBody = `
Új visszajelzés érkezett az esküvőnkhöz!

---
Név/nevek: ${name}
Vendégek száma: ${count} fő
Beküldés időpontja: ${timestamp}
---

Köszönjük a visszajelzést!
    `.trim();

    await transporter.sendMail({
      from: `"${process.env.SENDER_NAME || 'D & L Esküvő'}" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: process.env.EMAIL_SUBJECT || 'Új visszajelzés - D & L Esküvő',
      text: emailBody,
      html: `<pre>${emailBody}</pre>`,
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message,
    });
  }
}
