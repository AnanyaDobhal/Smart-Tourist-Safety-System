const { Alert, Tourist, Location, sequelize } = require('../../models');

exports.policeGetAllAlerts = async () => {
  return await Alert.findAll({
    include: {
      model: Tourist,
      attributes: ['name']
    },
    order: [['timestamp', 'DESC']]
  });
};

exports.policeGetLiveLocations = async () => {
  return await sequelize.query(`
    SELECT DISTINCT ON (t.id)
      t.id,
      t.name,
      l.latitude,
      l.longitude,
      l.timestamp
    FROM tourists t
    JOIN locations l ON t.id = l.tourist_id
    ORDER BY t.id, l.timestamp DESC;
  `, {
    type: sequelize.QueryTypes.SELECT
  });
};
