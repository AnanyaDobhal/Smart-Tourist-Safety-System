const crypto = require('crypto');

function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  });

  return { publicKey, privateKey };
}

function signData(privateKey, data) {
  if (!privateKey) {
    throw new Error('Private key is undefined');
  }

  const signer = crypto.createSign('SHA256');
  signer.update(JSON.stringify(data));
  signer.end();
  return signer.sign(privateKey, 'base64');
}

function verifySignature(publicKey, data, signature) {
  if (!publicKey) {
    throw new Error('Public key is undefined');
  }

  const verifier = crypto.createVerify('SHA256');
  verifier.update(JSON.stringify(data));
  verifier.end();
  return verifier.verify(publicKey, signature, 'base64');
}

module.exports = {
  generateKeyPair,
  signData,
  verifySignature
};
