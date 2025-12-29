const Alert = require('../models/Alert');

/**
 * Creates a new alert (panic, geofence, inactivity)
 */
exports.createAlert = async ({ touristId, type, latitude, longitude }) => {
  return await Alert.create({
    touristId,
    type,
    latitude,
    longitude
  });
};
