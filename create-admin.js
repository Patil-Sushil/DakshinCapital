// Quick script to create admin user
// Run: node create-admin.js

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import dotenv from "dotenv";

dotenv.config({ path: "./client/.env.local" });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const createAdmin = async () => {
  try {
    const email = "shreyasmalangave056@gmail.com";
    const password = "admin123"; // Change this to a secure password

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    console.log("✅ Admin user created successfully!");
    console.log("Email:", email);
    console.log("UID:", userCredential.user.uid);
    console.log("\nYou can now login at: http://localhost:3000/admin/login");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    if (error.code === "auth/email-already-in-use") {
      console.log(
        "✅ Admin user already exists. You can login with existing credentials.",
      );
    }
    process.exit(1);
  }
};

createAdmin();
