const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Alert = sequelize.define(
  'Alert',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tourist_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    alert_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // ✅ ADD THIS NEW COLUMN
    status: {
      type: DataTypes.ENUM('ACTIVE', 'RESOLVED'),
      defaultValue: 'ACTIVE'
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'alerts',
    timestamps: false
  }
);

module.exports = Alert;