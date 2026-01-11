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
<<<<<<< HEAD
    // ✅ ADD THESE TWO FIELDS
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
=======
>>>>>>> da8099354c084b953045624b58d63513c696db65
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
<<<<<<< HEAD
    tableName: 'alerts',
    timestamps: false
  }
);

module.exports = Alert;
=======
    tableName: 'alerts',   // ✅ EXACT DB table
    timestamps: false      // ✅ DB already manages time
  }
);

module.exports = Alert;
>>>>>>> da8099354c084b953045624b58d63513c696db65
