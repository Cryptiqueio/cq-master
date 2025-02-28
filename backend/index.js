const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// ✅ Properly configure CORS
app.use(cors({
  origin: ["http://localhost:3000", "https://cryptique-backend-318037903312.us-central1.run.app"], // Allow local dev & deployed frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json()); // Enable JSON parsing

// Import Routes
const authRoutes = require("./routes/auth");
const businessRoutes = require("./routes/business");
const transactionsRoutes = require("./routes/transactions"); // ✅ Import transactions API

// Use Routes
app.use("/auth", authRoutes);
app.use("/business", businessRoutes);
app.use("/transactions", transactionsRoutes); // ✅ Register transactions API

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
