const Alert = require('../models/Alert');

/**
 * Create an alert entry
 */
exports.createAlert = async ({ touristId, type, latitude, longitude }) => {
  if (!touristId || !type) {
    throw new Error('touristId and type are required');
  }

  // ✅ Build message automatically
  const message =
    type === 'PANIC'
      ? `🚨 PANIC alert triggered at (${latitude}, ${longitude})`
      : `Alert triggered at (${latitude}, ${longitude})`;

  const alert = await Alert.create({
    touristId,              // FK
    alert_type: type,        // ✅ matches DB column
    message                 // ✅ NOT NULL
  });

  return alert;
};
