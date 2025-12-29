const Location = require('../models/Location');

/**
 * Save live location sent from mobile app
 */
exports.saveLocation = async ({ touristId, latitude, longitude }) => {
  return await Location.create({
    touristId,
    latitude,
    longitude
  });
};
