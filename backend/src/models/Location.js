const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Location = sequelize.define('location', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  touristId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'locations',
  timestamps: true
});

module.exports = Location;
