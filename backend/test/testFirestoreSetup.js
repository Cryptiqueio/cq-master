const BusinessModel = require("../models/Business");
const EventModel = require("../models/Event");
const TransactionModel = require("../models/Transaction");

async function testFirestoreSetup() {
  const businessId = "business-123";
  const eventId = "event-456";
  const transactionId = "tx-789";

  // ✅ Create a Business
  await BusinessModel.createBusiness(businessId, "Crypto Marketing Ltd", "contact@crypto.com", "Pro");

  // ✅ Create an Event
  await EventModel.createEvent(eventId, businessId, "click", "Twitter");

  // ✅ Create a Transaction
  await TransactionModel.createTransaction(transactionId, businessId, 5.0, "ETH");

  // ✅ Fetch Business Data
  console.log(await BusinessModel.getBusiness(businessId));

  // ✅ Fetch Events by Business
  console.log(await EventModel.getEventsByBusiness(businessId));

  // ✅ Fetch Transactions by Business
  console.log(await TransactionModel.getTransactionsByBusiness(businessId));
}

// Run test
testFirestoreSetup();
