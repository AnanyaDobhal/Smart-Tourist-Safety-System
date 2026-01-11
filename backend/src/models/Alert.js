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
    touristId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    alert_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
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
