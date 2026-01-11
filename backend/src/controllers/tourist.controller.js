const Tourist = require('../models/Tourist');

// ✅ SAFE IMPORT (NO DESTRUCTURING)
const pkiService = require('../services/pki.service');

const generateKeyPair = pkiService.generateKeyPair;
const signData = pkiService.signData;
const verifySignature = pkiService.verifySignature;

/**
 * REGISTER TOURIST
 */
exports.registerTourist = async (req, res) => {
  try {
    console.log('REGISTER REQ BODY:', req.body);

    const {
      fullName,
      passportNumber,
      visitStart,
      visitEnd
    } = req.body;

    // ✅ Validation
    if (!fullName || !passportNumber || !visitStart || !visitEnd) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (new Date(visitStart) >= new Date(visitEnd)) {
      return res.status(400).json({
        error: 'visitEnd must be after visitStart'
      });
    }

    // ✅ Check duplicate passport
    const existing = await Tourist.findOne({
      where: { passportNumber }
    });

    if (existing) {
      return res.status(409).json({
        error: 'Passport already registered'
      });
    }

    // ✅ Generate PKI keys
    const { publicKey, privateKey } = generateKeyPair();

    const touristData = {
      fullName,
      passportNumber,
      visitStart,
      visitEnd
    };

    // ✅ Correct argument order
    const digitalSignature = signData(privateKey, touristData);

    // ✅ Save to DB
    const tourist = await Tourist.create({
      fullName,
      passportNumber,
      visitStart,
      visitEnd,
      publicKey,
      digitalSignature
    });

    return res.status(201).json({
      message: 'Digital Tourist ID Generated',
      touristId: tourist.id,
      publicKey,
      digitalSignature,
      validTill: visitEnd
    });

  } catch (err) {
    console.error('Register tourist error:', err);
    return res.status(500).json({
      error: 'Internal server error',
      details: err.message
    });
  }
};

/**
 * VERIFY TOURIST ID
 */
exports.verifyTouristID = async (req, res) => {
  try {
    const { touristId } = req.params;

    const tourist = await Tourist.findByPk(touristId);
    if (!tourist) {
      return res.status(404).json({ error: 'Tourist not found' });
    }

    const touristData = {
      fullName: tourist.fullName,
      passportNumber: tourist.passportNumber,
      visitStart: tourist.visitStart,
      visitEnd: tourist.visitEnd
    };

    const isValid = verifySignature(
      tourist.publicKey,
      touristData,
      tourist.digitalSignature
    );

    return res.json({
      touristId,
      valid: isValid
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
