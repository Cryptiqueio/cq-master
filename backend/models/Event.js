const db = require("../config/firebase");

class EventModel {
  // Function to log a new event
  static async createEvent(eventId, businessId, type, source) {
    try {
      const eventRef = db.collection("events").doc(eventId);
      await eventRef.set({
        businessId,
        type,
        source,
        timestamp: new Date(),
      });

      console.log(`✅ Event ${eventId} logged successfully.`);
      return { success: true };
    } catch (error) {
      console.error("❌ Error logging event:", error);
      return { success: false, error };
    }
  }

  // Function to retrieve all events for a business
  static async getEventsByBusiness(businessId) {
    try {
      const querySnapshot = await db.collection("events")
        .where("businessId", "==", businessId)
        .get();

      if (querySnapshot.empty) {
        console.log(`❌ No events found for business: ${businessId}`);
        return [];
      }

      let events = [];
      querySnapshot.forEach(doc => events.push(doc.data()));

      return events;
    } catch (error) {
      console.error("❌ Error retrieving events:", error);
      return [];
    }
  }
}

module.exports = EventModel;
