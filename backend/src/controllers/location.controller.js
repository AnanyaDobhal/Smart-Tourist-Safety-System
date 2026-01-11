const { saveLocation } = require('../services/location.service');
const { verifySignature } = require('../services/pki.service');
<<<<<<< HEAD
const Tourist = require('../models/Tourist'); // <--- FIXED: Import Tourist

=======
const User = require('../models/User');
>>>>>>> da8099354c084b953045624b58d63513c696db65
/**
 * LIVE LOCATION UPDATE API
 */
exports.updateLocation = async (req, res) => {
<<<<<<< HEAD
  try {
    const { user_id, payload, signature } = req.body;

    // 1. Find the TOURIST (not User)
    const tourist = await Tourist.findByPk(user_id);

    // 2. Validate Tourist and Key (Use 'publicKey' camelCase)
    if (!tourist || !tourist.publicKey) {
      return res.status(401).json({ error: "Tourist not found or Key not registered" });
    }

    // 3. Verify Signature
    const isValid = verifySignature(
      tourist.publicKey, // <--- FIXED: Correct field name
      payload,
      signature
    );

    if (!isValid) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    // 4. SAVE Location (This was missing in your file)
    const { latitude, longitude } = payload;
    
    await saveLocation({
      touristId: user_id,
      latitude,
      longitude
    });

    res.status(200).json({ message: "Location updated successfully" });

  } catch (err) {
    console.error("Location Update Error:", err);
    res.status(500).json({ error: err.message });
  }
};
=======
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
>>>>>>> da8099354c084b953045624b58d63513c696db65
