const { saveLocation } = require('../services/location.service');

/**
 * LIVE LOCATION UPDATE API
 */
exports.updateLocation = async (req, res) => {
  try {
    const { touristId, latitude, longitude } = req.body;

    if (!touristId || !latitude || !longitude) {
      return res.status(400).json({ error: 'Missing location data' });
    }

    await saveLocation({ touristId, latitude, longitude });

    res.json({ message: 'Location updated successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
