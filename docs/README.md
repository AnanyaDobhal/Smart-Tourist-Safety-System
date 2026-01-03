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
