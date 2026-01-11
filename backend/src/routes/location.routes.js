const express = require('express');
const router = express.Router();
const controller = require('../controllers/location.controller');

// Live location updates
router.post('/update', controller.updateLocation);

module.exports = router;
