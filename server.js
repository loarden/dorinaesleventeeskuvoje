import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Initialize email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Email submission endpoint
app.post('/api/submit-rsvp', async (req, res) => {
  const { name, count } = req.body;

  if (!name || !count) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const timestamp = new Date().toLocaleString('hu-HU');
    const emailBody = `
Új visszajelzés érkezett az esküvőnkhöz!

---
Név/nevek: ${name}
Vendégek száma: ${count} fő
Beküldés időpontja: ${timestamp}
---
    `.trim();

    const mailOptions = {
      from: `"${process.env.SENDER_NAME || 'D & L Esküvő'}" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: process.env.EMAIL_SUBJECT || 'Új visszajelzés - D & L Esküvő',
      text: emailBody,
      html: `<pre>${emailBody}</pre>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🎉 Wedding RSVP server running on http://localhost:${PORT}`);
});
