const Alert = require('../models/Alert');

/**
 * Creates a new alert (panic, geofence, inactivity)
 */
exports.createAlert = async ({ touristId, type, latitude, longitude }) => {
  return await Alert.create({
    tourist_id: touristId,        // ✅ Fix: map touristId -> tourist_id
    alert_type: type,             // ✅ Fix: map type -> alert_type
    latitude: latitude,
    longitude: longitude,
    message: "🚨 SOS PANIC BUTTON PRESSED!" // ✅ Fix: Must provide a message
  });
};