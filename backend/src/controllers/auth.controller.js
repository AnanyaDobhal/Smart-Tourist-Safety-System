const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { getUserWithRole } = require('../services/queries/auth.service');
const { generateToken } = require('../services/jwt.service');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserWithRole(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // SHA256 (because Flask used it)
  const hash = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');

  if (hash !== user.password_hash) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = generateToken(user);

  res.json({
    token,
    role: user.Role.role_name
  });
};
