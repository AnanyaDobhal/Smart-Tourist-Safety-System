const express = require('express');
const router = express.Router();
const controller = require('../controllers/alert.controller');

// Panic button
router.post('/panic', controller.panicAlert);

<<<<<<< HEAD
// ✅ ADD THIS: Get Alerts for Dashboard
router.get('/', controller.getAlerts);

module.exports = router;
=======
module.exports = router;
>>>>>>> da8099354c084b953045624b58d63513c696db65
