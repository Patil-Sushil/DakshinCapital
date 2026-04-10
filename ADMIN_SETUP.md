# Admin Setup Guide

## How to Create Admin Account

### Method 1: Firebase Console (Easiest)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project

2. **Navigate to Authentication**
   - Click "Authentication" in left sidebar
   - Click "Get Started" (if first time)
   - Go to "Users" tab

3. **Add Admin User**
   - Click "Add user" button
   - Enter email: `admin@financepro.com`
   - Enter password: `admin123` (or your choice)
   - Click "Add user"

4. **Login to Admin Panel**
   - Go to: http://localhost:3000/admin/login
   - Use the credentials you just created
   - You'll be redirected to the dashboard

---

### Method 2: Using Script (After Firebase Config)

1. **Make sure Firebase is configured**
   - Update `client/.env.local` with your Firebase credentials

2. **Run the admin creation script**

   ```bash
   node create-admin.js
   ```

3. **Login**
   - Go to: http://localhost:3000/admin/login
   - Email: admin@financepro.com
   - Password: admin123

---

## Admin Features Available

Once logged in, you can access:

✅ **Dashboard** - Overview and statistics
✅ **Protected Routes** - Auto-redirect if not authenticated
✅ **Session Management** - Auto-logout after 30 minutes of inactivity
✅ **Remember Me** - Stay logged in across browser sessions

---

## Admin Features Coming (Phases 7-12)

📋 **Enquiries Management** - View, respond to, and manage customer enquiries
🏗️ **Projects Management** - Add, edit, delete projects with image uploads
🖼️ **Gallery Management** - Upload and organize gallery images
📊 **Analytics** - View website statistics and user engagement

To implement these features, follow the code in `IMPLEMENTATION_GUIDE.md`

---

## Security Notes

1. **Change Default Password**: If using demo credentials, change them immediately
2. **Use Strong Passwords**: Minimum 8 characters with mix of letters, numbers, symbols
3. **Enable 2FA**: Consider enabling two-factor authentication in Firebase
4. **Firestore Rules**: Ensure proper security rules are deployed
5. **HTTPS Only**: Use HTTPS in production

---

## Troubleshooting

### "Invalid email or password"

- Verify the user exists in Firebase Console > Authentication
- Check that you're using the correct email/password
- Ensure Firebase config is correct in `.env.local`

### "Firebase not configured"

- Make sure `client/.env.local` has all Firebase credentials
- Restart the dev server after updating `.env.local`

### "Too many failed attempts"

- Firebase temporarily blocks after multiple failed login attempts
- Wait 15-30 minutes or reset password in Firebase Console

### Can't access admin routes

- Make sure you're logged in
- Check browser console for errors
- Verify Firebase Authentication is enabled in Firebase Console

---

## Next Steps

1. ✅ Create admin user
2. ✅ Login to admin panel
3. ✅ Explore the dashboard
4. 📖 Read `IMPLEMENTATION_GUIDE.md` to add more features
5. 🚀 Deploy to production using `DEPLOYMENT_GUIDE.md`

---

## Demo Credentials (Development Only)

For testing purposes:

- Email: `admin@financepro.com`
- Password: `admin123`

**⚠️ IMPORTANT**: Change these credentials before deploying to production!
