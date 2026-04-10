# Quick Start Guide - Finance Website

## 🚀 Get Started in 5 Minutes

### Prerequisites

- Node.js 18+ installed
- Firebase account
- Gmail account (for emails)

---

## Step 1: Install Dependencies (2 minutes)

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

---

## Step 2: Firebase Setup (2 minutes)

### Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project" → Name it → Create
3. Enable Authentication (Email/Password)
4. Create Firestore Database (production mode)
5. Enable Storage

### Get Configuration

1. Project Settings → Your apps → Web app
2. Copy firebaseConfig values
3. Create `client/.env.local`:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_URL=http://localhost:5000/api
```

### Create Admin User

1. Firebase Console → Authentication → Add user
2. Email: admin@financepro.com
3. Password: admin123 (or your choice)

---

## Step 3: Email Setup (1 minute)

### Get Gmail App Password

1. Google Account → Security → 2-Step Verification (enable)
2. App passwords → Generate for "Mail"
3. Copy 16-character password

### Configure Server

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=admin@company.com
CORS_ORIGIN=http://localhost:3000
```

---

## Step 4: Deploy Firebase Rules (1 minute)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (in project root)
firebase init

# Select: Firestore, Storage
# Use existing files

# Deploy
firebase deploy --only firestore:rules
firebase deploy --only storage
```

---

## Step 5: Run the Application (30 seconds)

### Terminal 1 - Frontend

```bash
cd client
npm run dev
```

Opens at: http://localhost:3000

### Terminal 2 - Backend

```bash
cd server
npm run dev
```

Runs at: http://localhost:5000

---

## ✅ Verify Everything Works

### Test Public Website

1. Open http://localhost:3000
2. Navigate through pages
3. Toggle dark/light theme
4. Try EMI calculator
5. Submit contact form
6. Check email received

### Test Admin Panel

1. Go to http://localhost:3000/admin/login
2. Login with admin credentials
3. View dashboard
4. Check all menu items

---

## 🎯 What You Have Now

✅ Complete public website with 10+ pages
✅ Dark/light theme system
✅ Interactive EMI calculator
✅ Contact form with email notifications
✅ Admin authentication
✅ Admin dashboard
✅ Responsive design
✅ Firebase integration

---

## 📚 Next Steps

### To Complete Remaining Features:

1. **Read IMPLEMENTATION_GUIDE.md** for Phases 7-12
2. **Implement Enquiries Management** (Phase 7)
3. **Add Projects Management** (Phase 8)
4. **Build Gallery System** (Phase 9)
5. **Make Public Pages Dynamic** (Phase 10)
6. **Add Animations** (Phase 11)
7. **Deploy to Production** (Phase 12)

### To Deploy to Production:

1. **Read DEPLOYMENT_GUIDE.md**
2. **Deploy Frontend** to Vercel
3. **Deploy Backend** to Railway
4. **Configure Production** environment variables
5. **Test Everything** in production

---

## 🆘 Troubleshooting

### Firebase Connection Error

```bash
# Check .env.local has correct values
# Verify Firebase project is active
# Check browser console for errors
```

### Email Not Sending

```bash
# Verify Gmail app password is correct
# Check 2-Step Verification is enabled
# Look at server console for errors
```

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

### Module Not Found

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📖 Documentation

- **README.md** - Project overview
- **SETUP_GUIDE.md** - Detailed setup
- **IMPLEMENTATION_GUIDE.md** - Complete remaining phases
- **DEPLOYMENT_GUIDE.md** - Production deployment
- **PROJECT_SUMMARY.md** - Full project details

---

## 🎉 You're Ready!

Your finance website is now running locally with:

- Beautiful UI with dark mode
- Working contact form
- Email notifications
- Admin authentication
- Dashboard

**Time to build something amazing!** 🚀

---

## 💡 Pro Tips

1. **Use Dark Mode** - Easier on the eyes during development
2. **Keep Server Running** - Leave both terminals open
3. **Check Console** - Browser and server logs for errors
4. **Test Mobile** - Use browser DevTools responsive mode
5. **Commit Often** - Use Git to save your progress

---

## 📞 Need Help?

- Check documentation files
- Review Firebase Console for errors
- Check browser console (F12)
- Review server terminal output
- Verify environment variables

---

**Happy Coding! 🎨✨**
