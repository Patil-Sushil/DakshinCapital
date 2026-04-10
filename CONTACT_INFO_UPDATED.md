# Contact Information Updated ✅

## Updated Throughout the Project

All contact information has been updated with your real details:

---

## Contact Details

### Email:

```
shreyasmalangave056@gmail.com
```

### Phone:

```
+91 8208790605
```

### WhatsApp:

```
https://wa.me/918208790605
```

### Address:

```
Shop No. 7, Second Floor
Govind Plaza, Opposite to Court
Vijaynagar, Sangli
Maharashtra
```

---

## Files Updated

### 1. Constants (`client/src/utils/constants.js`)

- ✅ Company email
- ✅ Company phone
- ✅ Company address
- ✅ WhatsApp link

### 2. Footer (`client/src/components/common/Footer.jsx`)

- ✅ Contact section with email, phone, address
- ✅ WhatsApp button link

### 3. Enquiry Service (`client/src/services/enquiry.service.js`)

- ✅ Reply-to email in EmailJS
- ✅ Phone number in email params

### 4. Admin Login (`client/src/pages/admin/Login.jsx`)

- ✅ Email placeholder
- ✅ Demo credentials

### 5. Create Admin Script (`create-admin.js`)

- ✅ Default admin email

---

## Where Contact Info Appears

### Public Website:

1. **Footer** (All Pages)
   - Email: shreyasmalangave056@gmail.com
   - Phone: +91 8208790605
   - Address: Shop No. 7, Second Floor, Govind Plaza...
   - WhatsApp button

2. **Contact Page**
   - Uses constants from `constants.js`
   - Shows all contact details

3. **Email Notifications**
   - Reply-to: shreyasmalangave056@gmail.com
   - Includes phone number

### Admin Panel:

4. **Login Page**
   - Email: shreyasmalangave056@gmail.com
   - Password: admin123 (change this!)

---

## Test the Updates

### 1. Check Footer

Visit any page and scroll to footer:

- ✅ Email should be: shreyasmalangave056@gmail.com
- ✅ Phone should be: +91 8208790605
- ✅ Address should show Sangli location
- ✅ WhatsApp button should link to your number

### 2. Test WhatsApp

Click "Chat on WhatsApp" button:

- Should open WhatsApp with number: 8208790605

### 3. Test Email Links

Click email in footer:

- Should open email client with: shreyasmalangave056@gmail.com

### 4. Test Phone Links

Click phone number:

- Should open phone dialer with: +91 8208790605

### 5. Test Admin Login

Go to: http://localhost:3000/admin/login

- Email: shreyasmalangave056@gmail.com
- Password: admin123

---

## Create Admin User

Run this command to create admin user with your email:

```bash
node create-admin.js
```

This will create:

- Email: shreyasmalangave056@gmail.com
- Password: admin123

**⚠️ Change the password after first login!**

---

## EmailJS Configuration

Your EmailJS should use:

**Reply-To Email:**

```
shreyasmalangave056@gmail.com
```

**Template Variables:**

- `{{to_email}}` - Customer email
- `{{to_name}}` - Customer name
- `{{phone}}` - Customer phone (8208790605 format)
- `{{message}}` - Customer message
- `{{loan_type}}` - Loan type
- `{{loan_amount}}` - Loan amount

---

## Social Media Links

Update these in `constants.js` when you have your social media pages:

```javascript
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/dakshincapital",
  twitter: "https://twitter.com/dakshincapital",
  linkedin: "https://linkedin.com/company/dakshincapital",
  instagram: "https://instagram.com/dakshincapital",
  youtube: "https://youtube.com/@dakshincapital",
  whatsapp: "https://wa.me/918208790605", // Already updated!
};
```

---

## Google Maps (Optional)

To add Google Maps to your contact page:

1. Go to Google Maps
2. Search for: "Shop No. 7, Govind Plaza, Vijaynagar, Sangli"
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Add to Contact page

---

## Business Hours

Currently set to:

- **Monday - Friday**: 9:00 AM - 6:00 PM
- **Saturday**: 9:00 AM - 2:00 PM
- **Sunday**: Closed

To change, update `COMPANY_INFO.workingHours` in `constants.js`

---

## Email Signature (For Manual Emails)

Use this signature when replying to enquiries:

```
Best Regards,

Dakshin Capital
Your Trusted Financial Partner

📧 shreyasmalangave056@gmail.com
📞 +91 8208790605
💬 WhatsApp: +91 8208790605

📍 Shop No. 7, Second Floor
   Govind Plaza, Opposite to Court
   Vijaynagar, Sangli, Maharashtra

🌐 www.dakshincapital.com
```

---

## Verification Checklist

- [ ] Footer shows correct email
- [ ] Footer shows correct phone
- [ ] Footer shows correct address
- [ ] WhatsApp button works
- [ ] Email links work
- [ ] Phone links work
- [ ] Admin login uses correct email
- [ ] EmailJS reply-to is correct
- [ ] Social media links updated (optional)

---

## Next Steps

1. ✅ Contact info updated
2. ⏳ Fix EmailJS template (see FIX_EMAILJS.md)
3. ⏳ Create admin user with your email
4. ⏳ Test all contact links
5. ⏳ Update social media links (when ready)
6. ⏳ Deploy to Hostinger

---

**All contact information has been updated throughout the project!** ✅

Last Updated: ${new Date().toLocaleString()}
