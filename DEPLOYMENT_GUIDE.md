# Complete Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Firebase account
- Vercel account (for frontend)
- Railway/Render account (for backend)
- Gmail account (for emails)
- Domain name (optional)

---

## Step 1: Firebase Setup

### 1.1 Create Firebase Project

```bash
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name: "finance-website-prod"
4. Disable Google Analytics (optional)
5. Click "Create project"
```

### 1.2 Enable Authentication

```bash
1. Go to Authentication → Get started
2. Enable "Email/Password"
3. Add admin user:
   - Email: admin@financepro.com
   - Password: [your-secure-password]
```

### 1.3 Create Firestore Database

```bash
1. Go to Firestore Database → Create database
2. Start in production mode
3. Choose location (closest to users)
4. Click "Enable"
```

### 1.4 Enable Storage

```bash
1. Go to Storage → Get started
2. Start in production mode
3. Use same location as Firestore
4. Click "Done"
```

### 1.5 Get Configuration

```bash
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click web icon (</>)
4. Register app: "finance-website"
5. Copy firebaseConfig object
6. Save for later
```

### 1.6 Deploy Firebase Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (in project root)
firebase init

# Select:
# - Firestore
# - Storage
# - Hosting (optional)

# Choose existing project
# Use existing files

# Deploy rules
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
firebase deploy --only storage
```

---

## Step 2: Gmail Setup for Emails

### 2.1 Enable 2-Step Verification

```bash
1. Go to https://myaccount.google.com/
2. Security → 2-Step Verification
3. Follow setup process
```

### 2.2 Create App Password

```bash
1. Go to https://myaccount.google.com/apppasswords
2. Select app: "Mail"
3. Select device: "Other (Custom name)"
4. Enter: "Finance Website"
5. Click "Generate"
6. Copy 16-character password
7. Save securely
```

---

## Step 3: Backend Deployment (Railway)

### 3.1 Prepare Backend

```bash
cd server

# Create Procfile
echo "web: node server.js" > Procfile

# Ensure package.json has start script
# "start": "node server.js"
```

### 3.2 Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Link to new project
railway link

# Add environment variables
railway variables set PORT=5000
railway variables set NODE_ENV=production
railway variables set EMAIL_HOST=smtp.gmail.com
railway variables set EMAIL_PORT=587
railway variables set EMAIL_USER=your-email@gmail.com
railway variables set EMAIL_PASSWORD=your-app-password
railway variables set EMAIL_FROM=your-email@gmail.com
railway variables set ADMIN_EMAIL=admin@company.com
railway variables set CORS_ORIGIN=https://your-frontend-url.vercel.app

# Deploy
railway up

# Get deployment URL
railway domain
# Save this URL for frontend configuration
```

### Alternative: Deploy to Render

```bash
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repository
4. Configure:
   - Name: finance-website-api
   - Environment: Node
   - Build Command: npm install
   - Start Command: node server.js
5. Add environment variables (same as above)
6. Create Web Service
7. Copy deployment URL
```

---

## Step 4: Frontend Deployment (Vercel)

### 4.1 Prepare Frontend

```bash
cd client

# Create .env.production
cat > .env.production << EOF
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_URL=https://your-backend-url.railway.app/api
EOF

# Test build
npm run build
```

### 4.2 Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Setup and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? finance-website
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod

# Get deployment URL
# Save this URL
```

### 4.3 Configure Environment Variables in Vercel Dashboard

```bash
1. Go to https://vercel.com/dashboard
2. Select your project
3. Settings → Environment Variables
4. Add all VITE_* variables from .env.production
5. Redeploy if needed
```

---

## Step 5: Update CORS Configuration

### 5.1 Update Backend CORS

```bash
# In Railway/Render dashboard
# Update CORS_ORIGIN environment variable
CORS_ORIGIN=https://your-frontend-url.vercel.app

# Redeploy backend
railway up
# or trigger redeploy in Render dashboard
```

---

## Step 6: Custom Domain (Optional)

### 6.1 Frontend Domain (Vercel)

```bash
1. Go to Vercel project → Settings → Domains
2. Add your domain: financepro.com
3. Add DNS records as instructed:
   - Type: A
   - Name: @
   - Value: 76.76.21.21

   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com
4. Wait for DNS propagation (up to 48 hours)
5. SSL certificate auto-generated
```

### 6.2 Backend Domain (Railway)

```bash
1. Go to Railway project → Settings
2. Generate domain or add custom domain
3. Update CORS_ORIGIN in backend
4. Update VITE_API_URL in frontend
5. Redeploy both
```

---

## Step 7: Post-Deployment Configuration

### 7.1 Update Firebase Authorized Domains

```bash
1. Go to Firebase Console → Authentication
2. Settings → Authorized domains
3. Add your production domains:
   - your-frontend.vercel.app
   - financepro.com (if using custom domain)
```

### 7.2 Test All Features

```bash
✓ Homepage loads
✓ Theme toggle works
✓ All pages accessible
✓ Contact form submits
✓ Email notifications received
✓ Admin login works
✓ Admin dashboard accessible
✓ EMI calculator functions
✓ Responsive on mobile
✓ Dark mode works
```

---

## Step 8: Monitoring & Analytics

### 8.1 Setup Firebase Analytics

```bash
1. Go to Firebase Console → Analytics
2. Enable Google Analytics
3. Follow setup wizard
```

### 8.2 Setup Error Monitoring (Optional)

```bash
# Install Sentry
npm install @sentry/react

# Configure in main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

### 8.3 Setup Uptime Monitoring

```bash
# Use services like:
- UptimeRobot (free)
- Pingdom
- StatusCake

# Monitor:
- Frontend URL
- Backend API health endpoint
```

---

## Step 9: SEO & Performance

### 9.1 Submit Sitemap

```bash
# Generate sitemap.xml in public folder
# Submit to Google Search Console
1. Go to https://search.google.com/search-console
2. Add property (your domain)
3. Verify ownership
4. Submit sitemap: https://financepro.com/sitemap.xml
```

### 9.2 Optimize Performance

```bash
# Run Lighthouse audit
1. Open site in Chrome
2. DevTools → Lighthouse
3. Generate report
4. Fix issues with score < 90
```

---

## Step 10: Backup & Security

### 10.1 Setup Firebase Backups

```bash
# Enable daily backups
1. Go to Firebase Console → Firestore
2. Import/Export → Schedule export
3. Choose Cloud Storage bucket
4. Set schedule: Daily at 2 AM
```

### 10.2 Security Checklist

```bash
✓ Firebase rules deployed
✓ Environment variables secured
✓ HTTPS enabled (automatic)
✓ CORS configured correctly
✓ Rate limiting active
✓ Input validation working
✓ No sensitive data in code
✓ Dependencies updated
```

---

## Troubleshooting

### Issue: CORS Error

```bash
Solution:
1. Check CORS_ORIGIN in backend matches frontend URL exactly
2. Include protocol (https://)
3. No trailing slash
4. Redeploy backend after changes
```

### Issue: Firebase Connection Failed

```bash
Solution:
1. Verify all VITE_FIREBASE_* variables are correct
2. Check Firebase project is active
3. Verify authorized domains in Firebase
4. Clear browser cache
```

### Issue: Email Not Sending

```bash
Solution:
1. Verify Gmail app password is correct
2. Check 2-Step Verification is enabled
3. Test with different email
4. Check Railway/Render logs for errors
```

### Issue: Build Failed

```bash
Solution:
1. Check all dependencies installed
2. Verify Node version (18+)
3. Clear node_modules and reinstall
4. Check for TypeScript errors
5. Review build logs
```

---

## Maintenance

### Daily Tasks

- Check enquiries in admin panel
- Respond to customer emails
- Monitor error logs

### Weekly Tasks

- Review Firebase usage
- Check website performance
- Update content if needed
- Backup important data

### Monthly Tasks

- Update dependencies
- Review security
- Analyze traffic
- Optimize based on analytics

---

## Cost Estimates

### Firebase (Free Tier)

- Firestore: 50K reads/day
- Storage: 5GB
- Authentication: Unlimited
- Hosting: 10GB/month

### Vercel (Hobby - Free)

- Bandwidth: 100GB/month
- Builds: Unlimited
- Domains: Unlimited

### Railway (Starter - $5/month)

- 500 hours/month
- 8GB RAM
- Shared CPU

### Total: ~$5-10/month for small-medium traffic

---

## Support Resources

- **Firebase**: https://firebase.google.com/support
- **Vercel**: https://vercel.com/support
- **Railway**: https://railway.app/help
- **React**: https://react.dev
- **Tailwind**: https://tailwindcss.com

---

**Deployment Complete! Your website is now live! 🚀**

Access your site at:

- Frontend: https://your-site.vercel.app
- Backend: https://your-api.railway.app
- Admin: https://your-site.vercel.app/admin/login
