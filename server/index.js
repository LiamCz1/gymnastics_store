require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'subscribers.json');

function readSubscribers() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function saveSubscribers(list) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

app.post('/subscribe', (req, res) => {
  const { email, name } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email required' });
  const subs = readSubscribers();
  if (subs.find(s => s.email && s.email.toLowerCase() === email.toLowerCase())) {
    return res.json({ ok: true, existing: true });
  }
  const sub = { email: email.toLowerCase(), name: name || '', createdAt: Date.now() };
  subs.push(sub);
  saveSubscribers(subs);
  res.json({ ok: true, sub });
});

app.get('/subscribers', (req, res) => {
  res.json(readSubscribers());
});

app.post('/send-newsletter', async (req, res) => {
  const { subject, text, html } = req.body || {};
  if (!subject) return res.status(400).json({ error: 'subject required' });
  const subs = readSubscribers();
  if (!subs.length) return res.status(400).json({ error: 'no subscribers' });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const from = process.env.FROM_EMAIL || process.env.SMTP_USER;
  const results = [];
  for (const s of subs) {
    try {
      const info = await transporter.sendMail({ from, to: s.email, subject, text: text || '', html: html || undefined });
      results.push({ email: s.email, success: true, info: info.response });
    } catch (e) {
      results.push({ email: s.email, success: false, error: e.message });
    }
  }
  res.json({ ok: true, count: subs.length, results });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Newsletter server running on port ${PORT}`));
