const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Alert = require('./Alert');
db.Tourist = require('./Tourist');
db.Location = require('./Location');

// Optional (later)
// db.User = require('./User');
// db.Role = require('./Role');

// ✅ CORRECT ASSOCIATIONS (camelCase everywhere)
db.Tourist.hasMany(db.Location, { foreignKey: 'touristId' });
db.Location.belongsTo(db.Tourist, { foreignKey: 'touristId' });

db.Tourist.hasMany(db.Alert, { foreignKey: 'touristId' });
db.Alert.belongsTo(db.Tourist, { foreignKey: 'touristId' });

module.exports = db;
