# Setup Guide - Finance Website

This guide will walk you through setting up the Finance Website project from scratch.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **Firebase CLI** - Install with: `npm install -g firebase-tools`

## 🔥 Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "finance-website")
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Create your first admin user:
   - Click "Add user"
   - Enter email and password
   - Click "Add user"

### Step 3: Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Select "Start in production mode"
4. Choose a location (closest to your users)
5. Click "Enable"

### Step 4: Enable Storage

1. Go to **Storage**
2. Click "Get started"
3. Start in production mode
4. Use the same location as Firestore
5. Click "Done"

### Step 5: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register app with a nickname
5. Copy the `firebaseConfig` object
6. Save these values for your `.env.local` file

### Step 6: Generate Service Account Key (for Server)

1. Go to **Project Settings** > **Service Accounts**
2. Click "Generate new private key"
3. Click "Generate key"
4. Save the JSON file securely
5. Place it in your server directory (DO NOT commit to Git!)
6. Update server `.env` with the path to this file

### Step 7: Deploy Firebase Rules

```bash
cd firebase
firebase login
firebase init

# Select:
# - Firestore
# - Storage
# - Choose existing project
# - Use existing files (firestore.rules, storage.rules)

firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
firebase deploy --only storage
```

## 💻 Local Development Setup

### Step 1: Install Client Dependencies

```bash
cd client
npm install
```

### Step 2: Configure Client Environment

Create `client/.env.local`:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_API_URL=http://localhost:5000/api
```

Replace the values with your Firebase configuration from Step 5 above.

### Step 3: Install Server Dependencies

```bash
cd server
npm install
```

### Step 4: Configure Server Environment

Create `server/.env`:

```env
PORT=5000
NODE_ENV=development

# Path to your Firebase service account JSON file
FIREBASE_SERVICE_ACCOUNT_KEY=./path-to-your-service-account-key.json

# Gmail SMTP Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=admin@company.com

CORS_ORIGIN=http://localhost:3000
```

### Step 5: Setup Gmail App Password (for Email Notifications)

1. Go to your [Google Account](https://myaccount.google.com/)
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Go to **App passwords**
5. Select "Mail" and "Other (Custom name)"
6. Enter "Finance Website"
7. Click "Generate"
8. Copy the 16-character password
9. Use this as `EMAIL_PASSWORD` in your server `.env` file

## 🚀 Running the Application

### Terminal 1 - Start the Client

```bash
cd client
npm run dev
```

The client will start on: **http://localhost:3000**

### Terminal 2 - Start the Server

```bash
cd server
npm run dev
```

The server will start on: **http://localhost:5000**

## ✅ Verify Setup

### Test Client

1. Open http://localhost:3000
2. You should see the homepage (will be built in Phase 2)

### Test Server

1. Open http://localhost:5000/health
2. You should see: `{"status":"OK","message":"Server is running"}`

### Test Firebase Connection

1. Try logging in to admin panel (will be built in Phase 6)
2. Use the email/password you created in Firebase Authentication

## 🔧 Troubleshooting

### Firebase Connection Issues

- Verify all environment variables are correct
- Check Firebase project is active
- Ensure billing is enabled (for production)

### Email Not Sending

- Verify Gmail app password is correct
- Check 2-Step Verification is enabled
- Ensure "Less secure app access" is OFF (use app password instead)

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

Once setup is complete, you're ready to proceed with:

- **Phase 2:** Theme System & Common Components
- **Phase 3:** Public Pages
- And so on...

## 🆘 Need Help?

If you encounter any issues:

1. Check the error message carefully
2. Verify all environment variables
3. Ensure all dependencies are installed
4. Check Firebase Console for any errors
5. Review the README.md for additional information

---

**Setup complete! You're ready to build an amazing finance website! 🎉**
