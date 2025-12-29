const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Alert = sequelize.define('Alert', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  touristId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('PANIC', 'GEOFENCE', 'INACTIVITY'),
    allowNull: false
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('OPEN', 'ACKNOWLEDGED', 'RESOLVED'),
    defaultValue: 'OPEN'
  }
});

module.exports = Alert;
