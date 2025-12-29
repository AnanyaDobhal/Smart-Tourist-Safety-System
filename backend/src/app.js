const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error('DB error:', err));

sequelize.sync(); // keep for prototype

app.get('/', (req, res) => {
  res.send('Smart Tourist Safety Backend Running');
});

const touristRoutes = require('./routes/tourist.routes');
app.use('/api/tourist', touristRoutes);

const alertRoutes = require('./routes/alert.routes');
const locationRoutes = require('./routes/location.routes');

app.use('/api/alerts', alertRoutes);
app.use('/api/location', locationRoutes);

module.exports = app;
