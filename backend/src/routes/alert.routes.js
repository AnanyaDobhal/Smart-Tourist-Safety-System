const express = require('express');
const router = express.Router();
const controller = require('../controllers/alert.controller');

// Panic button
router.post('/panic', controller.panicAlert);

// Get all alerts (Dashboard)
router.get('/', controller.getAlerts);

// ✅ NEW: Resolve Alert Endpoint
router.put('/:id/resolve', controller.resolveAlert);

module.exports = router;