const Tourist = require('../models/Tourist');
const { generateKeyPair, signData } = require('../services/pki.service');
const { verifySignature } = require('../services/pki.service');

exports.registerTourist = async (req, res) => {
  try {
    const { fullName, passportNumber, visitStart, visitEnd } = req.body;

    // ✅ 1. INPUT VALIDATION (YAHI ADD KARNA HAI)
    if (!fullName || !passportNumber || !visitStart || !visitEnd) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }
    if (new Date(visitStart) >= new Date(visitEnd)) {
      return res.status(400).json({
        error: 'visitEnd must be after visitStart'
      });
    }
    const existing = await Tourist.findOne({ where: { passportNumber } });
    if (existing) {
      return res.status(409).json({ error: 'Passport already registered' });
    }



    // ✅ 2. Generate PKI keys
    const { publicKey, privateKey } = generateKeyPair();

    const touristData = {
      fullName,
      passportNumber,
      visitStart,
      visitEnd
    };

    // ✅ 3. Sign tourist data
    const signature = signData(privateKey,touristData);

    // ✅ 4. Save to database
    const tourist = await Tourist.create({
      ...touristData,
      publicKey,
      digitalSignature: signature
    });

    // ✅ 5. Response
    // ✅ 5. Response
    res.status(201).json({
      message: 'Digital Tourist ID Generated',
      touristId: tourist.id,
      publicKey,
      privateKey, // <--- THIS MUST BE HERE
      digitalSignature: signature,
      validTill: visitEnd
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.verifyTouristID = async (req, res) => {
  try {
    const { touristId } = req.params;

    const tourist = await Tourist.findByPk(touristId);
    if (!tourist) return res.status(404).json({ message: 'Not found' });

    const data = {
      fullName: tourist.fullName,
      passportNumber: tourist.passportNumber,
      visitStart: tourist.visitStart,
      visitEnd: tourist.visitEnd
    };

    const isValid = verifySignature(
      data,
      tourist.digitalSignature,
      tourist.publicKey
    );

    res.json({
      touristId,
      valid: isValid
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};