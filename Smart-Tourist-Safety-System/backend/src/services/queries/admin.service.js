const { User, Role } = require('../../models');

exports.assignPoliceRole = async (user_id) => {
  const role = await Role.findOne({ where: { role_name: 'police' } });

  await User.update(
    { role_id: role.id },
    { where: { id: user_id } }
  );
};

exports.assignAdminRole = async (user_id) => {
  const role = await Role.findOne({ where: { role_name: 'admin' } });

  await User.update(
    { role_id: role.id },
    { where: { id: user_id } }
  );
};
const { User, Role, Tourist } = require('../../models');

exports.adminGetAllUsers = async () => {
  return await User.findAll({
    attributes: ['id', 'name', 'email', 'is_active', 'created_at'],
    include: {
      model: Role,
      attributes: ['role_name']
    }
  });
};

exports.adminGetAllTourists = async () => {
  return await Tourist.findAll({
    attributes: [
      'id',
      'name',
      'emergency_contact',
      'start_date',
      'end_date'
    ]
  });
};

exports.adminDeactivateUser = async (user_id) => {
  await User.update(
    { is_active: false },
    { where: { id: user_id } }
  );
};
