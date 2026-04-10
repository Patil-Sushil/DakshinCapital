# Quick Deploy Guide - 15 Minutes to Live! 🚀

## Step 1: Setup EmailJS (5 min)

1. Go to https://www.emailjs.com/ → Sign Up (free)
2. Add Gmail service → Connect your Gmail
3. Create email template (copy from EMAILJS_SETUP.md)
4. Get your 3 IDs:
   - Service ID
   - Template ID
   - Public Key

## Step 2: Update Environment (1 min)

Edit `client/.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 3: Build Project (2 min)

```bash
cd client
npm run build
```

## Step 4: Upload to Hostinger (5 min)

1. Login to Hostinger hPanel
2. File Manager → `public_html`
3. Delete default files
4. Upload everything from `client/dist` folder
5. Create `.htaccess` file with this content:

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## Step 5: Test (2 min)

1. Visit your domain
2. Go to Contact page
3. Submit enquiry form
4. Check email inbox

## Done! 🎉

Your website is now live!

**Cost:** $3/month (Hostinger only)
**Emails:** 200/month free (EmailJS)
**Database:** Free (Firebase)

---

## Need Help?

Read detailed guides:

- `EMAILJS_SETUP.md` - Complete EmailJS guide
- `FINAL_PROJECT_SUMMARY.md` - Full project details
- `HOSTINGER_DEPLOYMENT.md` - Deployment details
