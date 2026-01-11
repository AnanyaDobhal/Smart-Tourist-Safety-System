const { User, Role } = require('../../models');

exports.superadminChangeUserRole = async (user_id, new_role) => {
  const role = await Role.findOne({
    where: { role_name: new_role }
  });

  await User.update(
    { role_id: role.id },
    { where: { id: user_id } }
  );
};

exports.superadminDeleteUser = async (user_id) => {
  await User.destroy({
    where: { id: user_id }
  });
};
