# Netlify Deployment Guide

## 🚀 Quick Deploy

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Idyll Productions Email System"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy to Netlify

1. Go to [netlify.com](https://www.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Netlify will auto-detect Next.js settings

### 3. Configure Environment Variables

In Netlify Dashboard → Site settings → Environment variables, add:

```
RESEND_API_KEY=re_SuJGDBim_Na9EC7P1ocJ9knax53h9S3ae
NEXT_PUBLIC_SUPABASE_URL=https://fxkenzpbujidkulobuma.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4a2VuenBidWppZGt1bG9tdW1hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDY5Nzk4MCwiZXhwIjoyMDk2MjczOTgwfQ.LCi9J01GWZivb1fEk-MtgUk-1GB6zOwtjrpnpBJm2uI
FROM_EMAIL=noreply@idyllproductions.work
```

### 4. Deploy!

Click "Deploy site" and Netlify will build and deploy your app automatically.

## 🔧 Build Settings

Netlify will use these settings (from `netlify.toml`):
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 18

## 📝 Post-Deployment

1. **Custom Domain:** 
   - Go to Domain settings → Add custom domain
   - Point your domain DNS to Netlify

2. **HTTPS:** Automatically enabled by Netlify

3. **Supabase Table:**
   Run this in Supabase SQL Editor to enable email history:
   ```sql
   CREATE TABLE IF NOT EXISTS emails (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     recipient TEXT NOT NULL,
     subject TEXT NOT NULL,
     message TEXT NOT NULL,
     has_attachment BOOLEAN DEFAULT false,
     attachment_name TEXT,
     resend_id TEXT,
     sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     status TEXT DEFAULT 'sent',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   CREATE INDEX emails_sent_at_idx ON emails(sent_at DESC);
   CREATE INDEX emails_recipient_idx ON emails(recipient);
   
   ALTER TABLE emails ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Service role can do everything" ON emails
     FOR ALL
     TO service_role
     USING (true)
     WITH CHECK (true);
   
   GRANT ALL ON emails TO service_role;
   ```

## 🔐 System Password

The login password is: **2280**

To change it, update line 8 in:
- `app/login/page.tsx`
- `app/history/page.tsx`

## ✅ What Works on Netlify

- ✅ Password-protected access
- ✅ Email sending via Resend
- ✅ File attachments (up to 40MB)
- ✅ Email history (if Supabase table created)
- ✅ Responsive design
- ✅ All API routes
- ✅ Server-side rendering

## 🎉 Your Site is Live!

After deployment, you'll get a URL like:
`https://your-site-name.netlify.app`

You can then:
1. Test the email system
2. Add a custom domain
3. Share with your team

## 🆘 Troubleshooting

**Build fails?**
- Check environment variables are set correctly
- Ensure Node version is 18+

**Emails not sending?**
- Verify Resend API key
- Check domain is verified in Resend

**History not working?**
- Create Supabase table using SQL above
- Verify Supabase credentials

## 📞 Support

For issues, check:
- Netlify build logs
- Browser console (F12)
- Netlify functions logs
