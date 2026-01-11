const { createAlert } = require('../services/alert.service');
const Alert = require('../models/Alert'); // <--- ADD THIS IMPORT
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


// ... keep panicAlert as it is ...

/**
 * GET ALL ALERTS (For Dashboard)
 */
exports.getAlerts = async (req, res) => {
  try {
    // Fetch latest 10 alerts, newest first
    const alerts = await Alert.findAll({
      limit: 10,
      order: [['timestamp', 'DESC']]
    });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};