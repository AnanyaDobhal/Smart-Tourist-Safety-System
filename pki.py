import base64
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding


def verify_signature(public_key_pem, payload, signature):
    public_key = serialization.load_pem_public_key(
        public_key_pem.encode()
    )

    try:
        public_key.verify(
            base64.b64decode(signature),
            str(payload).encode(),
            padding.PKCS1v15(),
            hashes.SHA256()
        )
        return True
    except Exception:
        return False
