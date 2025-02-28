const admin = require("firebase-admin");
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
require("dotenv").config();  // ✅ Ensure .env is loaded

// Load Firebase service account credentials
const serviceAccount = require("../cryptique-firebase-adminsdk.json"); // Ensure this file exists

// ✅ Initialize Firebase Admin SDK (for backend Firestore access)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

// ✅ Correct Firestore Initialization
const db = admin.firestore();  

// ✅ Initialize Firebase App (for authentication)
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
