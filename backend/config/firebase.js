const admin = require("firebase-admin");
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

// Load Firebase service account credentials
const serviceAccount = require("../cryptique-firebase-adminsdk.json"); // Ensure this file exists

// ✅ Initialize Firebase Admin SDK (for Firestore & Backend Operations)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// ✅ Correct Firestore Initialization (Using Admin SDK)
const db = admin.firestore();  // 🔹 This ensures Firestore works for backend transactions

// ✅ Initialize Firebase App (for Client-side Auth)
const firebaseApp = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
});

// ✅ Get Firebase Auth Instance
const auth = getAuth(firebaseApp);

module.exports = { auth, db };
