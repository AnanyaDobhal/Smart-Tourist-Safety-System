# 🛡️ Smart Tourist Safety Monitoring & Incident Response System

A **hackathon prototype** that demonstrates a smart, secure, and real-time tourist safety platform using  
**AI, Cryptography (PKI), Geo-location, and Web Dashboards**.

---

## 🚀 Problem Statement

Tourist safety in remote and high-risk regions requires **real-time monitoring, rapid incident response, and secure identity verification**.

Traditional manual systems fail due to:
- Lack of live visibility
- Delayed response time
- No secure, verifiable tourist identity
- Poor coordination between departments

This project proposes a **Smart Tourist Safety System** that digitally protects tourists while respecting privacy.

---

## 🎯 Key Features (Prototype Scope)

### ✅ Digital Tourist ID (PKI-based)
- Secure tourist registration
- UUID-based Tourist ID
- RSA digital signature (tamper-proof)
- Time-bound validity

### 🚨 Panic Button & Live Alerts
- Tourist can trigger panic alert
- Live GPS location captured
- Alert stored securely in backend
- Real-time visibility on police dashboard

### 🗺️ Police Dashboard (Web)
- Sidebar + header UI (government-style)
- Dashboard overview
- Live Tourist Map (OpenStreetMap)
- Active alerts visualization
- Click marker → view alert details

### 🔐 Security First
- UUID enforcement
- PKI & digital signatures
- API-first backend
- Clear separation of concerns

---

## 🧱 Tech Stack

### Frontend
- **React.js** (Vite)
- **Leaflet + OpenStreetMap**
- Axios
- React Router

### Backend
- **Node.js + Express**
- PostgreSQL
- Sequelize ORM
- JWT (ready, partially implemented)

### Security
- RSA Cryptography (Node.js `crypto`)
- UUID-based identity
- Digital signatures

---

## 📂 Project Structure
smart-tourist-safety-system/
│
├── backend/ # Node.js + Express APIs 
├── dashboard/ # React Police Dashboard
├── ai-engine/ # AI / anomaly detection (future)
├── database/ # DB schema & seed files
└── README.md


---

## ▶️ How to Run the Project

### 1️⃣ Start Backend

```bash
cd backend
npm install
npx nodemon src/server.js
```

### 2️⃣ Register Tourist (API Test)
curl -X POST http://localhost:5000/api/tourist/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "passportNumber": "P1234567",
    "visitStart": "2025-02-01",
    "visitEnd": "2025-02-10"
  }'


➡️ Copy the returned touristId.

### 3️⃣ Trigger Panic Alert
curl -X POST http://localhost:5000/api/alerts/panic \
  -H "Content-Type: application/json" \
  -d '{
    "touristId": "PASTE_REAL_TOURIST_ID_HERE",
    "latitude": 27.1767,
    "longitude": 78.0081
  }'

### 4️⃣ Start Police Dashboard
cd dashboard
npm install
npm run dev


Open in browser:
http://localhost:5173

## 🔮 Future Enhancements

- AI-based anomaly detection
- Geo-fencing restricted zones
- Firebase push notifications
- Multilingual support
- E-FIR automation
- Mobile app (Flutter)

