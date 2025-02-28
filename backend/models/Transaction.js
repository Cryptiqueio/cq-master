const { db } = require("../config/firebase"); // ✅ Import Firestore correctly

class TransactionModel {
  // Function to log a transaction
  static async createTransaction(transactionId, businessId, amount, token) {
    try {
      const transactionRef = db.collection("transactions").doc(transactionId); // ✅ Fix: Ensure db is properly referenced
      await transactionRef.set({
        businessId,
        amount,
        token,
        timestamp: new Date(),
      });

      console.log(`✅ Transaction ${transactionId} recorded successfully.`);
      return { success: true };
    } catch (error) {
      console.error("❌ Error recording transaction:", error);
      return { success: false, error };
    }
  }

  // Function to retrieve transactions for a business
  static async getTransactionsByBusiness(businessId) {
    try {
      const querySnapshot = await db.collection("transactions")
        .where("businessId", "==", businessId)
        .get();

      if (querySnapshot.empty) {
        console.log(`❌ No transactions found for business: ${businessId}`);
        return [];
      }

      let transactions = [];
      querySnapshot.forEach(doc => transactions.push(doc.data()));

      return transactions;
    } catch (error) {
      console.error("❌ Error retrieving transactions:", error);
      return [];
    }
  }
}

module.exports = TransactionModel;
