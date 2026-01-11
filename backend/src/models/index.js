const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ Import models DIRECTLY (class-based)
db.Tourist = require('./Tourist');
db.Location = require('./Location');
db.Alert = require('./Alert');

// OPTIONAL (later)
// db.User = require('./User');
// db.Role = require('./Role');

// ✅ Associations
db.Tourist.hasMany(db.Location, { foreignKey: 'tourist_id' });
db.Location.belongsTo(db.Tourist, { foreignKey: 'tourist_id' });

db.Tourist.hasMany(db.Alert, { foreignKey: 'tourist_id' });
db.Alert.belongsTo(db.Tourist, { foreignKey: 'tourist_id' });

module.exports = db;
