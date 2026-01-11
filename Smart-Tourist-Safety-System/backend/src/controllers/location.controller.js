const { saveLocation } = require('../services/location.service');
const { verifySignature } = require('../services/pki.service');
const User = require('../models/User');
/**
 * LIVE LOCATION UPDATE API
 */
exports.updateLocation = async (req, res) => {
  const { user_id, payload, signature } = req.body;

  const user = await User.findByPk(user_id);

  if (!user || !user.public_key) {
    return res.status(401).json({ error: "Key not registered" });
  }

  const isValid = verifySignature(
    user.public_key,
    payload,
    signature
  );

  if (!isValid) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  // ✅ PKI passed → now update location
};
