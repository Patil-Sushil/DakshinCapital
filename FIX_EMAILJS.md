# Fix EmailJS Template - Quick Guide

## Problem

Error: "The recipients address is empty"

This means your EmailJS template doesn't have the recipient email configured.

---

## Solution (2 minutes)

### Step 1: Go to EmailJS Dashboard

1. Visit https://dashboard.emailjs.com/
2. Login with your account
3. Click "Email Templates" in sidebar

### Step 2: Edit Your Template

1. Find template: `template_vvcb5s7`
2. Click "Edit" button

### Step 3: Configure "To Email" Field

In the template settings, find the **"To Email"** field and set it to:

```
{{to_email}}
```

This tells EmailJS to send the email to the address from the form.

### Step 4: Update Template Content

Make sure your template has these variables:

**Subject:**

```
Thank You for Your Enquiry - Dakshin Capital
```

**Content (use the HTML from EMAILJS_SETUP.md or this simplified version):**

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }
      .header {
        background: #1e40af;
        color: white;
        padding: 30px;
        text-align: center;
      }
      .content {
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Thank You, {{to_name}}!</h1>
    </div>
    <div class="content">
      <p>We have received your enquiry for {{loan_type}}.</p>
      <p><strong>Loan Amount:</strong> {{loan_amount}}</p>
      <p><strong>Your Message:</strong> {{message}}</p>
      <p>Our team will contact you within 24 hours.</p>
      <hr />
      <p>
        <strong>Dakshin Capital</strong><br />
        Phone: +91 123 456 7890<br />
        Email: info@dakshincapital.com
      </p>
    </div>
  </body>
</html>
```

### Step 5: Save Template

Click "Save" button

### Step 6: Test

1. Go back to your website
2. Submit an enquiry
3. Check email inbox

---

## Alternative: Use EmailJS Auto-Reply

If the above doesn't work, try this:

### In EmailJS Template Settings:

1. **To Email**: Use your own email (e.g., `orthrox1422@gmail.com`)
2. **Reply-To**: `{{to_email}}`
3. **BCC**: `{{to_email}}`

This way:

- You receive the enquiry notification
- Customer gets a copy via BCC

---

## Quick Test

After fixing the template, test with this enquiry:

- Name: Test User
- Email: your-email@gmail.com
- Phone: 9876543210
- Message: Test message

You should receive an email!

---

## Still Not Working?

### Check EmailJS Dashboard Logs:

1. Go to https://dashboard.emailjs.com/
2. Click "History" in sidebar
3. See failed emails and error messages

### Common Issues:

**"Invalid template"**

- Make sure template ID matches: `template_vvcb5s7`
- Template must be published (not draft)

**"Service not found"**

- Verify service ID: `service_y0lqk3r`
- Make sure Gmail service is connected

**"Invalid public key"**

- Check public key: `4JY9QAfXg9eIfDSN4`
- Copy from Account page

---

## Current Configuration

Your `.env` file has:

```env
VITE_EMAILJS_SERVICE_ID=service_y0lqk3r
VITE_EMAILJS_TEMPLATE_ID=template_vvcb5s7
VITE_EMAILJS_PUBLIC_KEY=4JY9QAfXg9eIfDSN4
```

These look correct! Just need to fix the template.

---

## Summary

1. Go to EmailJS dashboard
2. Edit template `template_vvcb5s7`
3. Set "To Email" to `{{to_email}}`
4. Save template
5. Test enquiry form
6. Done!

---

**After fixing, your emails will work perfectly!** 📧✅
