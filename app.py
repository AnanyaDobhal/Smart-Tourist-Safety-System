from flask import Flask, request, jsonify
from db import get_connection
from pki import verify_signature

app = Flask(__name__)
print(">>> THIS app.py IS RUNNING <<<")

# -------------------------
# REGISTER TOURIST
# -------------------------
import hashlib

@app.route("/register", methods=["POST"])
def register():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")
    public_key = data.get("public_key")

    if not all([name, email, password, public_key]):
        return jsonify({"error": "Missing required fields"}), 400

    # simple hash for now (bcrypt later)
    password_hash = hashlib.sha256(password.encode()).hexdigest()

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO users (name, email, phone, password_hash, role_name, public_key)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (
        name,
        email,
        phone,
        password_hash,
        "tourist",
        public_key
    ))

    user_id = cur.fetchone()[0]

    cur.execute("""
        INSERT INTO tourists (id, name, emergency_contact)
        VALUES (%s, %s, %s)
    """, (user_id, name, phone))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({
        "message": "Tourist registered successfully",
        "user_id": user_id
    })
# -------------------------
# LOCATION UPDATE (SECURE)
# -------------------------
@app.route("/location", methods=["POST"])
def location_update():
    data = request.json

    tourist_id = data.get("tourist_id")
    payload = data.get("payload")
    signature = data.get("signature")

    if not tourist_id or not payload or not signature:
        return jsonify({"error": "Invalid request format"}), 400

    conn = get_connection()
    cur = conn.cursor()

    # 1️⃣ Fetch public key
    cur.execute(
        "SELECT public_key FROM users WHERE id = %s AND is_active = TRUE",
        (tourist_id,)
    )
    row = cur.fetchone()

    if not row or not row[0]:
        cur.close()
        conn.close()
        return jsonify({"error": "Public key not registered"}), 401

    public_key = row[0]

    # 2️⃣ Verify signature
    if not verify_signature(public_key, payload, signature):
        cur.close()
        conn.close()
        return jsonify({"error": "Invalid signature"}), 401

    # 3️⃣ Insert location
    cur.execute(
        """
        INSERT INTO locations (tourist_id, latitude, longitude)
        VALUES (%s, %s, %s)
        """,
        (
            tourist_id,
            payload["lat"],
            payload["lon"]
        )
    )

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Location updated securely"})


# -------------------------
# PANIC ALERT (SECURE)
# -------------------------
@app.route("/panic", methods=["POST"])
def panic():
    data = request.json

    tourist_id = data.get("tourist_id")
    payload = data.get("payload")
    signature = data.get("signature")

    if not tourist_id or not payload or not signature:
        return jsonify({"error": "Invalid request format"}), 400

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT public_key FROM users WHERE id = %s AND is_active = TRUE",
        (tourist_id,)
    )
    row = cur.fetchone()

    if not row or not row[0]:
        cur.close()
        conn.close()
        return jsonify({"error": "Public key not registered"}), 401

    public_key = row[0]

    if not verify_signature(public_key, payload, signature):
        cur.close()
        conn.close()
        return jsonify({"error": "Invalid signature"}), 401

    cur.execute(
        """
        INSERT INTO alerts (tourist_id, alert_type, message)
        VALUES (%s, %s, %s)
        """,
        (
            tourist_id,
            "PANIC",
            "Panic button pressed"
        )
    )

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"alert": "Panic alert sent securely"})


# -------------------------
# READ LOCATIONS (NO PKI)
# -------------------------
@app.route("/locations/<tourist_id>", methods=["GET"])
def get_locations(tourist_id):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT latitude, longitude, timestamp
        FROM locations
        WHERE tourist_id = %s
        ORDER BY timestamp DESC
        """,
        (tourist_id,)
    )

    rows = cur.fetchall()
    cur.close()
    conn.close()

    return jsonify({
        "locations": [
            {
                "lat": r[0],
                "lon": r[1],
                "time": r[2].isoformat()
            } for r in rows
        ]
    })


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False,
        use_reloader=False
    )
