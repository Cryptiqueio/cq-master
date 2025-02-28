const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const TransactionModel = require("../models/Transaction");

const router = express.Router();

// 🔹 Create a new transaction (Protected)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { transactionId, amount, token } = req.body;
    if (!transactionId || !amount || !token) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Call the Transaction model to create a transaction
    const result = await TransactionModel.createTransaction(
      transactionId,
      req.user.uid, // Get the businessId from JWT token
      amount,
      token
    );

    if (!result.success) throw new Error(result.error);

    return res.status(201).json({ message: "Transaction logged successfully" });
  } catch (error) {
    console.error("❌ Transaction Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// 🔹 Fetch transactions for a business (Protected)
router.get("/", verifyToken, async (req, res) => {
  try {
    // Call the Transaction model to get transactions
    const transactions = await TransactionModel.getTransactionsByBusiness(req.user.uid);

    return res.status(200).json({ transactions });
  } catch (error) {
    console.error("❌ Transaction Fetch Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
