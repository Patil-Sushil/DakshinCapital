# Hostinger Deployment Guide - Dakshin Capital

## Overview

This guide covers deploying your React + Node.js + Firebase application on Hostinger.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│         HOSTINGER WEB HOSTING (Frontend)                 │
│         - React App (Static Files)                       │
│         - Domain: dakshincapital.com                     │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│         HOSTINGER VPS/CLOUD (Backend)                    │
│         - Node.js API Server                             │
│         - Subdomain: api.dakshincapital.com              │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              GOOGLE FIREBASE                             │
│         - Firestore (Database)                           │
│         - Authentication                                 │
│         - Storage (if needed)                            │
└─────────────────────────────────────────────────────────┘
```

---

## Prerequisites

1. **Hostinger Account** with:
   - Web Hosting (for frontend) OR
   - VPS/Cloud Hosting (for both frontend + backend)
2. **Domain Name** (e.g., dakshincapital.com)
3. **Firebase Project** (already set up)
4. **Gmail Account** (for email service)

---

## Option 1: Hostinger Web Hosting + VPS (Recommended)

### Best For:

- Production websites
- Better performance
- Separate frontend and backend

### Cost:

- Web Hosting: ~$2-5/month
- VPS: ~$5-15/month

---

## Option 2: Hostinger VPS Only

### Best For:

- Full control
- Single server for everything
- Cost-effective

### Cost:

- VPS: ~$5-15/month

---

## Step-by-Step Deployment

## Part 1: Frontend Deployment (React App)

### Step 1: Build the React App

```bash
cd client
npm run build
```

This creates a `client/dist` folder with static files.

### Step 2: Upload to Hostinger

#### Method A: Using File Manager (Easy)

1. Login to Hostinger hPanel
2. Go to **File Manager**
3. Navigate to `public_html` folder
4. Delete default files (index.html, etc.)
5. Upload all files from `client/dist` folder
6. Done! Your site is live at your domain

#### Method B: Using FTP (Recommended)

1. Get FTP credentials from Hostinger hPanel
2. Use FileZilla or any FTP client
3. Connect to your hosting
4. Upload `client/dist` contents to `public_html`

### Step 3: Configure Environment Variables

Create `.htaccess` file in `public_html`:

```apache
# Enable Rewrite Engine
RewriteEngine On

# Redirect all requests to index.html for React Router
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### Step 4: Update Environment Variables

You need to update the API URL in your built files. Since Vite bakes environment variables at build time, you have two options:

#### Option A: Rebuild with Production URL

Before building, update `client/.env`:

```env
VITE_API_URL=https://api.dakshincapital.com/api
```

Then rebuild:

```bash
npm run build
```

#### Option B: Use Runtime Configuration

Create a `config.js` file that loads at runtime (more flexible).

---

## Part 2: Backend Deployment (Node.js API)

### Prerequisites:

- Hostinger VPS or Cloud Hosting (Node.js not supported on shared hosting)

### Step 1: Connect to VPS via SSH

```bash
ssh root@your-vps-ip
```

### Step 2: Install Node.js

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 3: Install PM2 (Process Manager)

```bash
npm install -g pm2
```

### Step 4: Upload Backend Code

#### Method A: Using Git (Recommended)

```bash
# Install Git
apt install git -y

# Clone your repository
cd /var/www
git clone https://github.com/yourusername/dakshin-capital.git
cd dakshin-capital/server

# Install dependencies
npm install
```

#### Method B: Using FTP/SFTP

1. Upload `server` folder to `/var/www/dakshin-capital/server`
2. SSH into server and install dependencies:

```bash
cd /var/www/dakshin-capital/server
npm install
```

### Step 5: Configure Environment Variables

```bash
cd /var/www/dakshin-capital/server
nano .env
```

Add your production environment variables:

```env
PORT=5000
NODE_ENV=production

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=admin@dakshincapital.com

# CORS Configuration
CORS_ORIGIN=https://dakshincapital.com
```

Save and exit (Ctrl+X, Y, Enter)

### Step 6: Start the Server with PM2

```bash
pm2 start server.js --name dakshin-api
pm2 save
pm2 startup
```

### Step 7: Install and Configure Nginx (Reverse Proxy)

```bash
# Install Nginx
apt install nginx -y

# Create Nginx configuration
nano /etc/nginx/sites-available/dakshin-api
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name api.dakshincapital.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
ln -s /etc/nginx/sites-available/dakshin-api /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 8: Install SSL Certificate (Free with Let's Encrypt)

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d api.dakshincapital.com

# Auto-renewal is set up automatically
```

---

## Part 3: Domain Configuration

### Step 1: Add Subdomain for API

In Hostinger hPanel:

1. Go to **Domains** → **Subdomains**
2. Create subdomain: `api.dakshincapital.com`
3. Point it to your VPS IP address

### Step 2: Update DNS Records

Add these DNS records in Hostinger:

```
Type    Name    Value                   TTL
A       @       [Your Web Hosting IP]   14400
A       api     [Your VPS IP]           14400
CNAME   www     dakshincapital.com      14400
```

---

## Part 4: Firebase Configuration

### No Changes Needed!

Firebase is already hosted by Google. Your app connects to it via the SDK.

### About the `firebase` Folder:

**You can delete it if:**

- ✅ You've already set Firestore rules in Firebase Console
- ✅ You've already set Storage rules in Firebase Console
- ✅ You don't plan to use Firebase CLI for deployments

**Keep it if:**

- You want to version control your Firebase rules
- You want to deploy rules via CLI: `firebase deploy --only firestore:rules`
- You want a backup of your rules

### To Delete Firebase Folder:

```bash
# It's safe to delete if rules are already set in Firebase Console
rm -rf firebase
```

---

## Part 5: Testing

### Test Frontend:

```
https://dakshincapital.com
```

### Test Backend API:

```
https://api.dakshincapital.com/api
https://api.dakshincapital.com/health
```

### Test Email:

Submit an enquiry form and check if emails are received.

### Test Firebase:

- Login to admin panel
- Submit enquiry (should save to Firestore)

---

## Part 6: Monitoring & Maintenance

### Check Backend Status:

```bash
pm2 status
pm2 logs dakshin-api
pm2 restart dakshin-api
```

### Update Backend Code:

```bash
cd /var/www/dakshin-capital/server
git pull origin main
npm install
pm2 restart dakshin-api
```

### Update Frontend:

```bash
# On your local machine
cd client
npm run build

# Upload dist folder to Hostinger via FTP
```

---

## Troubleshooting

### Frontend Issues:

**404 on page refresh:**

- Check `.htaccess` file exists
- Verify RewriteEngine is enabled

**API calls failing:**

- Check CORS settings in backend
- Verify API URL in environment variables
- Check browser console for errors

### Backend Issues:

**Server not starting:**

```bash
pm2 logs dakshin-api
```

**Port already in use:**

```bash
pm2 delete dakshin-api
pm2 start server.js --name dakshin-api
```

**Nginx errors:**

```bash
nginx -t
systemctl status nginx
tail -f /var/log/nginx/error.log
```

### Email Issues:

**Emails not sending:**

- Verify Gmail app password is correct
- Check server logs: `pm2 logs dakshin-api`
- Test SMTP connection

---

## Cost Breakdown

### Hostinger Hosting:

- **Web Hosting**: $2.99/month (Premium)
- **VPS**: $5.99/month (KVM 1)
- **Domain**: $9.99/year

### Total Monthly Cost: ~$9-15/month

### Free Services:

- Firebase (Free tier: 50K reads, 20K writes/day)
- Let's Encrypt SSL (Free)
- Gmail SMTP (Free)

---

## Alternative: All-in-One VPS Deployment

If you want everything on one VPS:

1. Install Node.js and Nginx
2. Build React app and serve via Nginx
3. Run Node.js backend with PM2
4. Configure Nginx to serve both

**Nginx Configuration:**

```nginx
# Frontend
server {
    listen 80;
    server_name dakshincapital.com www.dakshincapital.com;
    root /var/www/dakshin-capital/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Security Checklist

- ✅ Enable HTTPS (SSL certificate)
- ✅ Set strong passwords
- ✅ Configure firewall (UFW)
- ✅ Keep Node.js and packages updated
- ✅ Use environment variables (never commit .env)
- ✅ Enable Firebase security rules
- ✅ Set up regular backups
- ✅ Monitor server logs
- ✅ Use PM2 for process management
- ✅ Configure rate limiting

---

## Backup Strategy

### Database (Firestore):

- Automatic backups by Firebase
- Export data periodically via Firebase Console

### Code:

- Use Git for version control
- Push to GitHub/GitLab regularly

### Server:

- Use Hostinger's backup feature
- Or set up automated backups with cron

---

## Performance Optimization

### Frontend:

- ✅ Already using Vite (fast builds)
- ✅ Code splitting enabled
- ✅ Lazy loading routes
- Enable Cloudflare CDN (optional)

### Backend:

- ✅ Using PM2 cluster mode
- ✅ Nginx reverse proxy
- ✅ Compression enabled
- Add Redis caching (optional)

### Firebase:

- ✅ Indexed queries
- ✅ Pagination for large datasets
- ✅ Security rules optimized

---

## Summary

**Yes, you can host on Hostinger!**

**Firebase folder:** Safe to delete if rules are already set in Firebase Console.

**Recommended Setup:**

1. Frontend → Hostinger Web Hosting
2. Backend → Hostinger VPS
3. Database → Firebase (Google)

**Total Cost:** ~$9-15/month

**Deployment Time:** 2-3 hours

---

## Need Help?

- Hostinger Support: 24/7 live chat
- Firebase Docs: firebase.google.com/docs
- This project's docs: Check other .md files

---

**Good luck with your deployment! 🚀**
