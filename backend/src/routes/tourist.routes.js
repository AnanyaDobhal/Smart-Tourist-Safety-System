const express = require('express');
const router = express.Router();
const controller = require('../controllers/tourist.controller');

// Register tourist
router.post('/register', controller.registerTourist);

// ✅ Verify tourist ID
router.get('/verify/:touristId', controller.verifyTouristID);

module.exports = router;
