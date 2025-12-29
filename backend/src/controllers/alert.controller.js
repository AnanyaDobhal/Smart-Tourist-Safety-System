const { createAlert } = require('../services/alert.service');

/**
 * PANIC BUTTON API
 * Triggered when tourist presses panic button
 */
exports.panicAlert = async (req, res) => {
  try {
    const { touristId, latitude, longitude } = req.body;

    if (!touristId || !latitude || !longitude) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const alert = await createAlert({
      touristId,
      type: 'PANIC',
      latitude,
      longitude
    });

    res.status(201).json({
      message: 'PANIC alert triggered',
      alert
    });


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
