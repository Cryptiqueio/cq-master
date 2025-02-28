const db = require("../config/firebase");

async function testFirestore() {
  try {
    // Create a test document in Firestore
    await db.collection("test").doc("check").set({
      message: "Firestore is working!",
      timestamp: new Date(),
    });

    console.log("✅ Firestore test document created successfully!");
  } catch (error) {
    console.error("❌ Firestore connection failed:", error);
  }
}

// Run the test
testFirestore();
