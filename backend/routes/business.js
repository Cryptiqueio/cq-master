const express = require("express");
const { db } = require("../config/firebase");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Get Business Info (Protected)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const businessDoc = await db.collection("businesses").doc(req.userId).get();

    if (!businessDoc.exists) {
      return res.status(404).json({ error: "Business not found" });
    }

    return res.status(200).json(businessDoc.data());
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
