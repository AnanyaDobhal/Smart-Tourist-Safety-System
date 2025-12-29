const crypto = require('crypto');

exports.generateKeyPair = () => {
  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
  });
};

exports.signData = (data, privateKey) => {
  const signer = crypto.createSign('SHA256');
  signer.update(JSON.stringify(data));
  signer.end();
  return signer.sign(privateKey, 'base64');
};

exports.verifySignature = (data, signature, publicKey) => {
  const verifier = crypto.createVerify('SHA256');
  verifier.update(JSON.stringify(data));
  verifier.end();
  return verifier.verify(publicKey, signature, 'base64');
};
