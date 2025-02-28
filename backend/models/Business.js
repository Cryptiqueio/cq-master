const db = require("../config/firebase");

class BusinessModel {
  // Function to create a new business document
  static async createBusiness(businessId, name, email, plan) {
    try {
      const businessRef = db.collection("businesses").doc(businessId);
      await businessRef.set({
        name,
        email,
        plan,
        createdAt: new Date(),
      });

      console.log(`✅ Business ${businessId} created successfully.`);
      return { success: true };
    } catch (error) {
      console.error("❌ Error creating business:", error);
      return { success: false, error };
    }
  }

  // Function to retrieve business details
  static async getBusiness(businessId) {
    try {
      const doc = await db.collection("businesses").doc(businessId).get();
      if (!doc.exists) {
        console.log(`❌ No business found for ID: ${businessId}`);
        return null;
      }
      return doc.data();
    } catch (error) {
      console.error("❌ Error retrieving business:", error);
      return null;
    }
  }
}

module.exports = BusinessModel;
