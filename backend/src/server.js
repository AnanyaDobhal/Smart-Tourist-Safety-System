const app = require('./app');
const sequelize = require('./config/db');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

sequelize.sync().then(() => {
  console.log('Database synced');
});