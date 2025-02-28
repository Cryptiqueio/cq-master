const express = require("express");
const jwt = require("jsonwebtoken");
const { auth, db } = require("../config/firebase");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const router = express.Router();

// 🔹 Business Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, plan } = req.body;

    // ✅ Validate input fields
    if (!name || !email || !password || !plan) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Check if email is already registered
    let existingUser;
    try {
      existingUser = await auth.getUserByEmail(email);
    } catch (error) {
      existingUser = null; // Email not found, proceed with signup
    }

    if (existingUser) {
      return res.status(400).json({ error: "This email is already registered. Please log in." });
    }

    // ✅ Create new business user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // ✅ Store business in Firestore
    await db.collection("businesses").doc(userRecord.uid).set({
      name,
      email,
      plan,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "Signup successful", userId: userRecord.uid });
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// 🔹 Business Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // ✅ Verify user credentials with Firebase Auth
    const firebaseAuth = getAuth();
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    const user = userCredential.user;

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // ✅ Generate JWT Token including email
    const token = jwt.sign(
      { uid: user.uid, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      userId: user.uid,
      email: user.email,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(400).json({ error: "Invalid email or password" });
  }
});

module.exports = router;
