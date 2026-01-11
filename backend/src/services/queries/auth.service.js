const { User, Role } = require('../../models');

exports.createUser = async (name, email, phone, password_hash) => {
  const touristRole = await Role.findOne({
    where: { role_name: 'tourist' }
  });

  return await User.create({
    name,
    email,
    phone,
    password_hash,
    role_id: touristRole.id
  });
};
exports.getUserWithRole = async (email) => {
  return await User.findOne({
    where: {
      email,
      is_active: true
    },
    attributes: ['id', 'name', 'email'],
    include: {
      model: Role,
      attributes: ['role_name']
    }
  });
};
