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

  // ❌ ENUM REMOVED
  // ✅ STRING USED
  type: {
    type: DataTypes.STRING,
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

  // ❌ ENUM REMOVED
  status: {
    type: DataTypes.STRING,
    defaultValue: 'OPEN'
  }

}, {
  timestamps: true
});

module.exports = Alert;
