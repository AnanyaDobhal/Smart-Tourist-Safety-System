require('dotenv').config();

const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 5000;

// ✅ ONLY test connection — DO NOT sync
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected');

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB connection error:', err);
  });
