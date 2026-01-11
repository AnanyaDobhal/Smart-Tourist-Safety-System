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
    // The app sends the Tourist ID, so we must check the Tourist table
    const tourist = await Tourist.findByPk(user_id);

    // 2. Validate Tourist and Key
    // Note: Tourist model uses 'publicKey' (camelCase), not 'public_key'
    if (!tourist || !tourist.publicKey) {
      console.log("❌ Tourist not found or Key missing for ID:", user_id);
      return res.status(401).json({ error: "Tourist not found or Key not registered" });
    }

    // 3. Verify Signature
    const isValid = verifySignature(
      tourist.publicKey, // ✅ Fix: Use correct field name
      payload,
      signature
    );

    if (!isValid) {
      console.log("❌ Invalid Signature for Tourist:", user_id);
      return res.status(401).json({ error: "Invalid signature" });
    }

    // 4. Save Location
    const { latitude, longitude } = payload;
    
    await saveLocation({
      touristId: user_id,
      latitude,
      longitude
    });

    console.log(`✅ Location updated for ${tourist.fullName}`);
    res.status(200).json({ message: "Location updated successfully" });

  } catch (err) {
    console.error("Location Update Error:", err);
    res.status(500).json({ error: err.message });
  }
};