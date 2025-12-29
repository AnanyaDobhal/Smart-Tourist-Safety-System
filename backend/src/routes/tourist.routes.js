const express = require('express');
const router = express.Router();
const controller = require('../controllers/tourist.controller');

router.post('/register', controller.registerTourist);

module.exports = router;
