const {
  generateKeyPair,
  signData,
  verifySignature
} = require('./pki.service');

// Generate keys
const keys = generateKeyPair();

console.log('Keys object:', keys); // DEBUG (important)

// Destructure AFTER confirming
const { publicKey, privateKey } = keys;

// Payload
const payload = {
  user_id: 'test-user-id',
  lat: 30.3165,
  lon: 78.0322
};

// Sign
const signature = signData(privateKey, payload);

// Verify
const isValid = verifySignature(publicKey, payload, signature);

console.log('Signature valid?', isValid);
