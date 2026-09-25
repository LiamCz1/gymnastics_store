require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Stripe = require('stripe');

const app = express();
app.use(cors());

const stripe = process.env.STRIPE_SECRET_KEY ? Stripe(process.env.STRIPE_SECRET_KEY) : null;

app.post('/stripe/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(503).json({ error: 'Stripe webhook is not configured.' });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).json({ error: `Webhook signature verification failed: ${error.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    console.log(`Stripe checkout completed: ${event.data.object.id}`);
  }

  return res.json({ received: true });
});

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe is not configured on the server.' });
  }

  const { lineItems, customerEmail } = req.body || {};
  if (!Array.isArray(lineItems) || lineItems.length === 0) {
    return res.status(400).json({ error: 'At least one checkout item is required.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: customerEmail || undefined,
      line_items: lineItems,
      success_url: `${process.env.PUBLIC_APP_URL || 'http://localhost:4173'}/buy.html?checkout=success`,
      cancel_url: `${process.env.PUBLIC_APP_URL || 'http://localhost:4173'}/buy.html?checkout=cancelled`
    });

    return res.json({ id: session.id, url: session.url });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

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
