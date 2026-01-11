const express = require('express');
const router = express.Router();
const controller = require('../controllers/alert.controller');

// Panic button
router.post('/panic', controller.panicAlert);

module.exports = router;
