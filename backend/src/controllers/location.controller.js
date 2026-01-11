const { saveLocation } = require('../services/location.service');
const { verifySignature } = require('../services/pki.service');
const Tourist = require('../models/Tourist'); // ✅ CHANGED: Import Tourist, not User

/**
 * LIVE LOCATION UPDATE API
 */
exports.updateLocation = async (req, res) => {
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
      tourist.publicKey, // ✅ Fix: Use correct field name
      payload,
      signature
    );

    if (!isValid) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    // 4. Save Location (This code was missing)
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