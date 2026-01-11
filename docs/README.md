<div align="center">

<h1>🛡️ Smart Tourist Safety System</h1>

<br />

<p align="center">
<img src="https://www.google.com/search?q=https://placehold.co/800x400/png%3Ftext%3DPlace%2BYour%2BDashboard%2BScreenshot%2BHere" alt="Project Banner" width="100%" />
</p>

</div>

🚀 Project Overview

A Next-Gen Incident Response Platform protecting tourists using PKI & Live Geolocation.

This system is built on three core pillars:

🔐 Secure: Uses PKI (Public Key Infrastructure) to digitally sign every location update, ensuring that only registered devices can send data.

⚡ Real-time: Provides instantaneous communication between tourists and police dashboards, reducing response times in critical situations.

✅ Verifiable: Ensures data integrity by mathematically validating signatures, effectively preventing location spoofing or false alerts.

🚨 The Challenge

In remote or high-tourism zones, safety infrastructure is often fragmented and slow.

🕵️‍♂️ Identity Gaps: Authorities cannot instantly verify if a distress signal is from a legitimate tourist or a prank.

🐢 Latency: Traditional emergency calls (911/112) struggle to pinpoint precise GPS coordinates in real-time.

🔓 Data Trust: Location data can be spoofed, leading to wasted police resources.

<br />

💡 The Solution

The Smart Tourist Safety System bridges the gap between tourists and law enforcement with a unified full-stack platform:

For Tourists: A mobile app acting as a "Digital Bodyguard," signing every GPS update with a private RSA key.

For Police: A real-time "Command Center" dashboard that validates signatures, visualizes SOS alerts, and manages incidents.

🌟 Key Features

<table>
<tr>
<td width="50%">
<h3>🔐 Digital Identity (PKI)</h3>
<p>Every tourist is issued a unique <strong>Digital ID</strong> upon registration. A private key is generated locally on their device, ensuring that <strong>only</strong> the registered device can send valid location updates.</p>
</td>
<td width="50%">
<h3>📍 Tamper-Proof Tracking</h3>
<p>GPS coordinates are <strong>digitally signed</strong> using RSA cryptography before leaving the phone. This prevents "spoofing" or fake location attacks.</p>
</td>
</tr>
<tr>
<td>
<h3>🆘 One-Tap Panic Mode</h3>
<p>Triggers an immediate high-priority alert. It forces a high-accuracy GPS fix, sets alert priority to <strong>CRITICAL</strong>, and pushes data to the Police Dashboard instantly.</p>
</td>
<td>
<h3>🗺️ Live Command Dashboard</h3>
<p>Real-time cluster maps for high-density tourist areas, live scrolling lists of SOS signals, and automatic Geofence Monitoring.</p>
</td>
</tr>
</table>

🛠️ Tech Stack

Domain

Technology

Key Highlights

📱 Mobile

React Native (Expo)

Cross-platform, SecureStore, Expo Location

💻 Frontend

React.js + Vite

Leaflet Maps, Real-time updates, Material UI

⚙️ Backend

Node.js + Express

REST API, PKI Validation, Geofencing Logic

💾 Database

PostgreSQL

Relational data, Sequelize ORM

🔒 Security

RSA Cryptography

jsrsasign (App) & Node Crypto (Backend)

🚀 Quick Start Guide

Follow these steps to get the entire system running locally.

📋 Prerequisites

Node.js (v18+)

PostgreSQL (Running locally)

Expo Go App (on your phone)

1️⃣ Backend Setup

The brain of the operation.

cd backend
npm install
# Create .env file with your DB credentials
# Run Database Seeder (Critical for demo data!)
node seed.js
# Start Server
npm run dev


Server runs on: http://localhost:5000

2️⃣ Police Dashboard Setup

The command center for authorities.

cd dashboard
npm install
npm run dev


Open browser at: http://localhost:5173

3️⃣ Mobile App Setup

The tourist interface.

⚠️ CRITICAL: The mobile app cannot access localhost. You must update the API URL to your computer's local IP.

Open TouristSafetyApp/TouristSafetyApp/app/(tabs)/index.js.

Find const API_URL and update it:

// Windows: run `ipconfig` | Mac: run `ifconfig`
// Example:
const API_URL = '[http://192.168.1.5:5000/api](http://192.168.1.5:5000/api)';


Run the app:

cd TouristSafetyApp/TouristSafetyApp
npx expo start


Scan the QR code with your phone.

📸 Interface Preview

Mobile SOS Interface

Police Live Map

<img src="https://www.google.com/search?q=https://placehold.co/300x600/png%3Ftext%3DMobile%2BApp" alt="Mobile App" width="200" />

<img src="https://www.google.com/search?q=https://placehold.co/600x400/png%3Ftext%3DDashboard%2BMap" alt="Dashboard Map" width="400" />

Simple, high-contrast UI

Real-time incident tracking

🔮 Future Roadmap

[ ] 🤖 AI Anomaly Detection: Detect unusual movement patterns (e.g., sudden stops or deviation from route).

[ ] 📡 Offline Mode: Cache GPS data when internet is lost and sync when online.

[ ] 📲 SMS Fallback: Send SOS coordinates via SMS if data connection fails.

<div align="center">
<p>Built with ❤️ for a Safer World.</p>
</div>
