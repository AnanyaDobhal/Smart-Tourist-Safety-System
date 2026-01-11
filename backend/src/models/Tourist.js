const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tourist = sequelize.define(
  'Tourist',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Add this line
      primaryKey: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passportNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    visitStart: DataTypes.DATE,
    visitEnd: DataTypes.DATE,
    publicKey: DataTypes.TEXT,
    digitalSignature: DataTypes.TEXT
  },
  {
    tableName: 'tourists',   // ✅ MUST match existing DB table
    timestamps: false        // ✅ IMPORTANT (no auto create)
  }
);

module.exports = Tourist;
