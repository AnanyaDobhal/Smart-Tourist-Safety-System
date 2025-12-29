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

// Sync models
sequelize.sync({ alter: true })
  .then(() => console.log('All models synced'))
  .catch(err => console.error('Sync error:', err));

app.get('/', (req, res) => {
  res.send('Smart Tourist Safety Backend Running');
});

// Routes
app.use('/api/tourist', require('./routes/tourist.routes'));
app.use('/api/location', require('./routes/location.routes'));
app.use('/api/alerts', require('./routes/alert.routes'));

module.exports = app;

