const sequelize = require('../config/db');

const Tourist = require('./Tourist');
const Alert = require('./Alert');
const Location = require('./Location');

// Optional: associations later
// Tourist.hasMany(Location)
// Tourist.hasMany(Alert)

module.exports = {
  sequelize,
  Tourist,
  Alert,
  Location
};
