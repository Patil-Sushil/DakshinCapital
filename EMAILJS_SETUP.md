# EmailJS Setup Guide - Dakshin Capital

## What is EmailJS?

EmailJS allows you to send emails directly from JavaScript without a backend server. Perfect for Hostinger web hosting!

**Benefits:**

- ✅ No backend server needed
- ✅ Works on regular web hosting
- ✅ Free tier: 200 emails/month
- ✅ Easy to set up (5 minutes)

---

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Click "Sign Up" (free)
3. Verify your email
4. Login to dashboard

---

## Step 2: Add Email Service

1. In EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (recommended)
4. Click "Connect Account"
5. Login with your Gmail account
6. Allow EmailJS permissions
7. Note down your **Service ID** (e.g., `service_abc123`)

---

## Step 3: Create Email Template

1. Click "Email Templates" in sidebar
2. Click "Create New Template"
3. Use this template:

### Template Name:

```
Dakshin Capital - Enquiry Confirmation
```

### Template ID:

Note it down (e.g., `template_xyz789`)

### Subject:

```
Thank You for Your Enquiry - Dakshin Capital
```

### Content (HTML):

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
        color: white;
        padding: 30px;
        text-align: center;
        border-radius: 10px 10px 0 0;
      }
      .logo {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .content {
        background: #f9fafb;
        padding: 30px;
        border-radius: 0 0 10px 10px;
      }
      .message-box {
        background: white;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
        border-left: 4px solid #10b981;
      }
      .info-box {
        background: #eff6ff;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
      }
      .info-item {
        margin: 10px 0;
      }
      .label {
        font-weight: bold;
        color: #1e40af;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 2px solid #e5e7eb;
        color: #6b7280;
        font-size: 14px;
      }
      .contact-info {
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="logo">💰 Dakshin Capital</div>
      <h1>Thank You for Your Enquiry!</h1>
    </div>

    <div class="content">
      <p style="font-size: 18px;">Dear {{to_name}},</p>

      <div class="message-box">
        <p style="margin: 0; font-size: 16px;">
          ✅ We have successfully received your loan enquiry. Our team will
          review your requirements and get back to you within
          <strong>24 hours</strong>.
        </p>
      </div>

      <div class="info-box">
        <h3 style="color: #1E40AF; margin-top: 0;">Your Enquiry Details:</h3>
        <div class="info-item">
          <span class="label">Loan Type:</span> {{loan_type}}
        </div>
        <div class="info-item">
          <span class="label">Loan Amount:</span> {{loan_amount}}
        </div>
        <div class="info-item">
          <span class="label">Message:</span><br />
          {{message}}
        </div>
      </div>

      <div class="info-box">
        <h3 style="color: #1E40AF; margin-top: 0;">What Happens Next?</h3>
        <ol style="margin: 10px 0; padding-left: 20px;">
          <li>Our loan expert will review your enquiry</li>
          <li>We'll contact you via phone or email</li>
          <li>Discuss your requirements in detail</li>
          <li>Provide personalized loan options</li>
          <li>Guide you through the application process</li>
        </ol>
      </div>

      <div class="contact-info">
        <h3 style="color: #1E40AF;">Need Immediate Assistance?</h3>
        <div class="info-item">📞 <strong>Phone:</strong> +91 123 456 7890</div>
        <div class="info-item">
          📧 <strong>Email:</strong> info@dakshincapital.com
        </div>
        <div class="info-item">
          💬 <strong>WhatsApp:</strong> +91 123 456 7890
        </div>
        <div class="info-item">
          🕐 <strong>Hours:</strong> Mon-Fri: 9 AM - 6 PM, Sat: 9 AM - 2 PM
        </div>
      </div>

      <div
        style="background: #FEF3C7; padding: 20px; border-radius: 8px; border-left: 4px solid #F59E0B; margin: 20px 0;"
      >
        <p style="margin: 0; color: #92400E;">
          <strong>💡 Pro Tip:</strong> Keep your documents ready (ID proof,
          address proof, income proof, bank statements) for faster processing!
        </p>
      </div>
    </div>

    <div class="footer">
      <p><strong>Dakshin Capital</strong></p>
      <p>Your Trusted Financial Partner</p>
      <p>123 Finance Street, Business District, City - 400001</p>
      <p style="font-size: 12px; margin-top: 15px;">
        This is an automated email. Please do not reply to this message.
      </p>
    </div>
  </body>
</html>
```

### Variables Used:

- `{{to_name}}` - Customer name
- `{{to_email}}` - Customer email
- `{{loan_type}}` - Type of loan
- `{{loan_amount}}` - Loan amount
- `{{message}}` - Customer message

4. Click "Save"

---

## Step 4: Get Your Public Key

1. Click "Account" in sidebar
2. Find "Public Key" section
3. Copy your public key (e.g., `abc123XYZ`)

---

## Step 5: Update Environment Variables

Update `client/.env`:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abc123XYZ
```

Replace with your actual values from EmailJS dashboard.

---

## Step 6: Test Locally

1. Restart your dev server:

```bash
cd client
npm run dev
```

2. Open http://localhost:3000
3. Go to Contact page
4. Fill and submit the enquiry form
5. Check the email inbox of the email you entered

---

## Step 7: Build for Production

```bash
cd client
npm run build
```

This creates a `client/dist` folder ready for Hostinger.

---

## Deployment to Hostinger

### Step 1: Upload Files

1. Login to Hostinger hPanel
2. Go to File Manager
3. Navigate to `public_html`
4. Delete default files
5. Upload all files from `client/dist` folder

### Step 2: Create .htaccess

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

### Step 3: Test Production

Visit your domain: `https://yourdomain.com`

Test the enquiry form - you should receive an email!

---

## Troubleshooting

### Email Not Received:

1. **Check Spam Folder** - EmailJS emails might go to spam initially
2. **Verify EmailJS Dashboard** - Check "Logs" section for errors
3. **Check Browser Console** - Look for JavaScript errors
4. **Verify Environment Variables** - Make sure they're correct
5. **Check EmailJS Quota** - Free tier: 200 emails/month

### Common Errors:

**"Service ID not found"**

- Double-check your Service ID in .env file
- Make sure it matches EmailJS dashboard

**"Template ID not found"**

- Verify Template ID in .env file
- Ensure template is published in EmailJS

**"Public Key invalid"**

- Copy the correct public key from EmailJS Account page
- No spaces or extra characters

### EmailJS Not Working:

1. Check browser console for errors
2. Verify all three IDs are correct
3. Make sure Gmail service is connected
4. Check EmailJS dashboard logs
5. Try sending a test email from EmailJS dashboard

---

## EmailJS Pricing

### Free Tier:

- ✅ 200 emails/month
- ✅ 2 email services
- ✅ 2 email templates
- ✅ Perfect for small businesses

### Paid Plans (if needed):

- **Personal**: $7/month - 1,000 emails
- **Professional**: $15/month - 5,000 emails
- **Enterprise**: Custom pricing

---

## Security Notes

1. **Public Key is Safe** - It's meant to be public
2. **Service ID is Safe** - Can be in frontend code
3. **Template ID is Safe** - Can be in frontend code
4. **Never expose** - Gmail password (EmailJS handles this)

---

## Advantages Over Backend Email

✅ **No Server Needed** - Works on regular web hosting
✅ **No Maintenance** - EmailJS handles everything
✅ **Reliable** - 99.9% uptime
✅ **Easy Setup** - 5 minutes vs hours
✅ **Cost Effective** - Free for 200 emails/month
✅ **Scalable** - Upgrade as you grow

---

## What Happens When User Submits Enquiry?

1. ✅ Form data saved to Firebase Firestore
2. ✅ EmailJS sends confirmation email to user
3. ✅ User receives professional email
4. ✅ Admin can view enquiries in Firebase Console
5. ✅ No backend server needed!

---

## Monitoring Enquiries

### View in Firebase Console:

1. Go to Firebase Console
2. Click "Firestore Database"
3. Open "enquiries" collection
4. See all submitted enquiries

### Export Enquiries:

You can export data from Firebase Console as JSON or CSV.

---

## Summary

**What Changed:**

- ❌ Removed Node.js backend server
- ❌ Removed Nodemailer
- ✅ Added EmailJS (client-side)
- ✅ Sends only ONE email (to user)
- ✅ Works on Hostinger web hosting
- ✅ No VPS needed!

**Cost:**

- Hostinger Web Hosting: $3/month
- EmailJS: Free (200 emails/month)
- Firebase: Free tier
- **Total: $3/month** 🎉

**Deployment:**

- Just upload `client/dist` folder to Hostinger
- No server configuration needed
- Works immediately!

---

## Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Firebase Docs: https://firebase.google.com/docs

---

**Your project is now ready for Hostinger! 🚀**
