const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Location = sequelize.define(
  'Location',
  {
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
  },
  {
    tableName: 'locations',   // 👈 IMPORTANT
    freezeTableName: true     // 👈 prevents pluralization
  }
);

module.exports = Location;