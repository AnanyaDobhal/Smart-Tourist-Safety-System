const { createAlert } = require('../services/alert.service');
const Alert = require('../models/Alert');

/**
 * PANIC BUTTON API
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

    res.status(201).json({ message: 'PANIC alert triggered', alert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET ALL ALERTS
 */
exports.getAlerts = async (req, res) => {
  try {
    // Show newest first
    const alerts = await Alert.findAll({
      order: [['timestamp', 'DESC']],
      limit: 50
    });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * ✅ NEW: RESOLVE ALERT API
 */
exports.resolveAlert = async (req, res) => {
  try {
    const { id } = req.params;
    
    const alert = await Alert.findByPk(id);
    if (!alert) {
      return res.status(404).json({ error: "Alert not found" });
    }

    // Update status
    alert.status = 'RESOLVED';
    await alert.save();

    res.json({ message: "Alert resolved successfully", alert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};