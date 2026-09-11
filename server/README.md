# Newsletter server

This small Express server stores newsletter subscribers in `subscribers.json` and can send newsletters via SMTP using `nodemailer`.

Setup

1. Install dependencies:

```bash
cd server
npm install
```

2. Create a `.env` in `server/` with SMTP credentials, for example:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
FROM_EMAIL="Gymnastics Store <no-reply@yourdomain.com>"
PORT=3000
```

3. Start the server:

```bash
npm start
```

Endpoints

- `POST /subscribe` { email, name } — adds subscriber
- `GET /subscribers` — list subscribers
- `POST /send-newsletter` { subject, text, html } — send email to all subscribers

Scheduling

Run a cron job or Windows Task Scheduler entry to call `POST /send-newsletter` with your content, or run a small script that calls the endpoint.
