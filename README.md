# Idyll Productions Email System

Professional email dispatcher with password protection, built with Next.js and Resend.

## 🚀 Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🔐 System Password

**2280**

## 📧 Features

- Password-protected access
- Send emails via Resend
- File attachments (up to 40MB)
- Email history with Supabase
- Modern responsive design
- Orange & black theme

## 🛠️ Local Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 📝 Environment Variables

```env
RESEND_API_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=your_url
SUPABASE_SERVICE_ROLE_KEY=your_key
FROM_EMAIL=noreply@idyllproductions.work
```

## 📄 License

Private - Idyll Productions
