const Location = require('../models/Location');
const Tourist = require('../models/Tourist');

/**
 * UPDATE LIVE LOCATION
 */
exports.updateLocation = async (req, res) => {
  try {
    const { touristId, latitude, longitude } = req.body;

    // ✅ Basic validation
    if (!touristId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        error: 'touristId, latitude and longitude are required'
      });
    }

    // ✅ Check tourist exists
    const tourist = await Tourist.findByPk(touristId);
    if (!tourist) {
      return res.status(404).json({
        error: 'Tourist not found'
      });
    }

    // ✅ Save location
    const location = await Location.create({
      touristId,
      latitude,
      longitude
    });

    return res.status(201).json({
      message: 'Location updated successfully',
      locationId: location.id
    });

  } catch (err) {
    console.error('Location update error:', err);
    return res.status(500).json({
      error: 'Internal server error',
      details: err.message
    });
  }
};
