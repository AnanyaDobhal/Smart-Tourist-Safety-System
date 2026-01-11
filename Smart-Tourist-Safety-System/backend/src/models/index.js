const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models (DO NOT call them as functions)
db.Alert = require('./Alert');
db.Tourist = require('./Tourist');
db.Location = require('./Location');

// OPTIONAL (add later when you create these properly)
// db.User = require('./User');
// db.Role = require('./Role');

// Associations that DO exist
db.Tourist.hasMany(db.Location, { foreignKey: 'tourist_id' });
db.Location.belongsTo(db.Tourist, { foreignKey: 'tourist_id' });

db.Tourist.hasMany(db.Alert, { foreignKey: 'tourist_id' });
db.Alert.belongsTo(db.Tourist, { foreignKey: 'tourist_id' });

module.exports = db;
