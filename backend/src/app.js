const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models'); // ✅ IMPORTANT

const app = express();

app.use(cors());
app.use(express.json());

// DB connection
sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('DB connection error:', err));

app.get('/', (req, res) => {
  res.send('Smart Tourist Safety Backend Running');
});
// SOS Simulator Route
app.post('/api/simulate-sos', async (req, res) => {
  const { Alert, Tourist } = require('./models');
  try {
    const tourist = await Tourist.findOne();
    if (!tourist) return res.status(404).json({ error: "No tourists found. Run seed.js first." });

    const newAlert = await Alert.create({
      tourist_id: tourist.id,
      touristId: tourist.id,
      alert_type: "SOS",
      message: "🚨 EMERGENCY: SOS triggered from Simulator!",
      timestamp: new Date()
    });

    res.status(201).json({ message: "SOS Sent!", alert: newAlert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/simulate-breach', async (req, res) => {
  const { Alert, Tourist } = require('./models');
  try {
    const tourist = await Tourist.findOne();
    const breachAlert = await Alert.create({
      tourist_id: tourist.id,
      touristId: tourist.id,
      alert_type: "Geofence Breach",
      message: "⚠️ WARNING: Tourist has exited the Taj Mahal Safe Perimeter!",
      timestamp: new Date()
    });
    res.status(201).json({ message: "Breach alert created!", alert: breachAlert });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Routes
app.use('/api/tourist', require('./routes/tourist.routes'));
app.use('/api/location', require('./routes/location.routes'));
app.use('/api/alerts', require('./routes/alert.routes'));

module.exports = app;