const { Tourist, Location, Alert } = require('../../models');

exports.getTouristProfile = async (tourist_id) => {
  return await Tourist.findByPk(tourist_id, {
    attributes: [
      'id',
      'name',
      'emergency_contact',
      'start_date',
      'end_date'
    ]
  });
};

exports.getTouristLocations = async (tourist_id) => {
  return await Location.findAll({
    where: { tourist_id },
    attributes: ['latitude', 'longitude', 'timestamp'],
    order: [['timestamp', 'DESC']]
  });
};

exports.getTouristAlerts = async (tourist_id) => {
  return await Alert.findAll({
    where: { tourist_id },
    attributes: ['alert_type', 'message', 'timestamp'],
    order: [['timestamp', 'DESC']]
  });
};
