Here are the changes to remove the unwanted menu items and fix the Sidebar layout issue so it doesn't cover your dashboard content.

### **1. Remove Settings & Case File from Sidebar**

We will update `Sidebar.jsx` to remove those specific `NavLink` items.

**Update file: `dashboard/src/components/Sidebar.jsx**`

```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdMap, MdVerifiedUser, MdWarning, MdLogout } from "react-icons/md"; // Keeping only used icons
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Safe<span>Travel</span></h2>
      </div>
      
      <nav className="nav-links">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <MdDashboard />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/live-map" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <MdMap />
          <span>Live Map</span>
        </NavLink>

        <NavLink to="/alerts" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <MdWarning />
          <span>Alerts & Incidents</span>
        </NavLink>

        <NavLink to="/tourist-verification" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <MdVerifiedUser />
          <span>Tourist Verification</span>
        </NavLink>
        
        {/* Settings and Case File options have been removed */}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/" className="nav-item logout">
          <MdLogout />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

```

---

### **2. Fix Sidebar Layout (Prevent Overlap)**

The overlap happens because the sidebar is likely `fixed` (floating on top) while the main content ignores it. We will use a **Flexbox layout** so they sit side-by-side perfectly.

**Update file: `dashboard/src/layout/MainLayout.jsx**`

```jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from './Header'; // Ensure you have this component

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      {/* Sidebar sits in the flow, not fixed */}
      <Sidebar /> 
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* Header and Content Area */}
        <Header /> 
        <main style={{ padding: '2rem', overflowY: 'auto', background: 'var(--background-light)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

```

**Update file: `dashboard/src/components/sidebar.css**`

Make sure the sidebar stays on the screen (`sticky`) but takes up space in the layout so nothing hides behind it.

```css
.sidebar {
  background: var(--background-dark);
  color: white;
  height: 100vh;
  width: 260px;
  min-width: 260px; /* Force width so it doesn't shrink */
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 10px rgba(0,0,0,0.1);
  position: sticky; /* Keeps it visible while scrolling content */
  top: 0;
  z-index: 100;
}

.sidebar-logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-logo span {
  color: var(--secondary-color);
}

.nav-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex-grow: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-item:hover, .nav-item.active {
  background: var(--primary-color);
  color: white;
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(108, 99, 255, 0.4);
}

.nav-item svg {
  margin-right: 12px;
  font-size: 1.4rem;
}

/* Push Logout to bottom visually */
.sidebar-footer {
  margin-top: auto;
}

.nav-item.logout {
  color: #FF6584; /* Make logout reddish for attention */
}
.nav-item.logout:hover {
  background: rgba(255, 101, 132, 0.1);
  color: #ff8fa3;
}

```



import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= FIX LEAFLET ICON ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

/* ================= CUSTOM ICONS ================= */
const touristIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [32, 32],
});

const alertIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/564/564619.png",
  iconSize: [32, 32],
});

/* ================= MOCK DATA (fallback) ================= */
const mockTourists = [
  { id: "T-101", lat: 27.1751, lng: 78.0421, name: "Alice Johnson" },
  { id: "T-102", lat: 26.9124, lng: 75.7873, name: "Bob Smith" },
];

const mockAlerts = [
  { id: "A-001", lat: 27.176, lng: 78.043, type: "SOS", message: "Medical Emergency" },
];

const highRiskZones = [
  { lat: 27.18, lng: 78.04, radius: 500 }, // Near Taj Mahal
];

export default function LiveMap() {
  const [tourists, setTourists] = useState(mockTourists);
  const [alerts, setAlerts] = useState(mockAlerts);

  // Simulation: Move tourists slightly every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTourists((prev) =>
        prev.map((t) => ({
          ...t,
          lat: t.lat + (Math.random() - 0.5) * 0.001,
          lng: t.lng + (Math.random() - 0.5) * 0.001,
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const simulateBreach = () => {
    alert("⚠️ SIMULATION: Tourist T-102 entered a High-Risk Zone!");
  };

  return (
    <MainLayout>
      <div style={styles.header}>
        <h2>Live Tourist Tracking Map</h2>
        <p style={{ opacity: 0.7 }}>Real-time location monitoring of tourists and active alerts.</p>
      </div>

      <div style={styles.wrapper}>
        {/* ===== MAP CONTAINER ===== */}
        <div style={styles.mapBox}>
          <MapContainer
            center={[27.1751, 78.0421]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Render Tourists */}
            {tourists.map((t) => (
              <Marker key={t.id} position={[t.lat, t.lng]} icon={touristIcon}>
                <Popup>
                  <b>{t.name}</b> <br /> ID: {t.id}
                </Popup>
              </Marker>
            ))}

            {/* Render Alerts */}
            {alerts.map((a) => (
              <Marker key={a.id} position={[a.lat, a.lng]} icon={alertIcon}>
                <Popup>
                  <b>🚨 {a.type}</b> <br /> {a.message}
                </Popup>
              </Marker>
            ))}

            {/* Render Safe/Risk Zones */}
            {highRiskZones.map((z, i) => (
              <Circle
                key={i}
                center={[z.lat, z.lng]}
                radius={z.radius}
                pathOptions={{ color: "red", fillOpacity: 0.15 }}
              />
            ))}
          </MapContainer>

          {/* ===== FLOATING STATS OVERLAY ===== */}
          <div style={styles.stats}>
            <div style={styles.statItem}>👤 Tourists: <strong>{tourists.length}</strong></div>
            <div style={styles.statItem}>🚨 Alerts: <strong>{alerts.length}</strong></div>
            <div style={styles.statItem}>⚠ Zones: <strong>{highRiskZones.length}</strong></div>
          </div>
        </div>
      </div>

      <button onClick={simulateBreach} style={styles.simButton}>
        🚧 Simulate Boundary Breach
      </button>
    </MainLayout>
  );
}

/* ================= STYLES ================= */
const styles = {
  header: {
    marginBottom: "1.5rem",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "75vh", // Fixed height for map area
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "var(--shadow-lg)",
    border: "1px solid rgba(0,0,0,0.05)",
  },
  mapBox: {
    flex: 1,
    position: "relative",
    zIndex: 1,
  },
  stats: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    padding: "15px 20px",
    borderRadius: "15px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    zIndex: 999, // Ensure it sits above the map
    display: "flex",
    gap: "20px",
    border: "1px solid rgba(255,255,255,0.5)",
  },
  statItem: {
    fontSize: "0.95rem",
    color: "var(--text-primary)",
  },
  simButton: {
    width: "100%",
    padding: "15px",
    backgroundColor: "var(--primary-color)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    marginTop: "20px",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "var(--shadow-sm)",
    transition: "transform 0.2s",
  },
};



To fix the layout issues and remove the map filters while maintaining a "phenomenal" look, we need to restructure how the **Sidebar**, **Header**, and **Page Content** interact.

The best way to prevent the sidebar from interfering with the dashboard or map is to use a **Flexbox Layout** instead of absolute positioning. This makes the sidebar and content sit side-by-side perfectly.

Here are the corrected files:

### 1. Update `MainLayout.jsx` (The Structural Fix)

This new layout treats the Sidebar and Content as two side-by-side boxes. The sidebar takes fixed space, and the content fills the rest. No more overlapping.

**File:** `dashboard/src/layout/MainLayout.jsx`

```jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* Sidebar is a flex item, it won't float on top anymore */}
      <Sidebar />

      {/* Content Area takes remaining space */}
      <div className="content-area">
        <Header />
        
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

```

**Add these styles to `dashboard/src/index.css` (or `App.css`) to support the layout:**

```css
/* Layout Structure */
.main-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden; /* Prevents double scrollbars */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.page-content {
  flex: 1;
  overflow-y: auto; /* Only the content scrolls, header stays fixed */
  padding: 2rem;
}

```

---

### 2. Update `LiveMap.jsx` (Filters Removed)

I have removed the filter UI and logic. The map now takes up the full container space with a beautiful glassmorphism container.

**File:** `dashboard/src/pages/LiveMap.jsx`

```jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const LiveMap = () => {
  // Mock Data - In a real app, fetch this from your API
  const [tourists] = useState([
    { id: 1, name: "Alice", lat: 51.505, lng: -0.09, status: "safe" },
    { id: 2, name: "Bob", lat: 51.51, lng: -0.1, status: "warning" },
  ]);

  const [incidents] = useState([
    { id: 1, type: "Theft", lat: 51.515, lng: -0.09, severity: "high" }
  ]);

  return (
    <div className="live-map-container">
      <div className="map-header">
        <h1>Live Tourist Tracking</h1>
        <p>Real-time monitoring of tourist safety zones</p>
      </div>

      <div className="map-wrapper">
        <MapContainer 
          center={[51.505, -0.09]} 
          zoom={13} 
          style={{ height: "100%", width: "100%", borderRadius: "20px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Tourist Markers */}
          {tourists.map(t => (
            <Marker key={t.id} position={[t.lat, t.lng]}>
              <Popup>
                <strong>{t.name}</strong> <br /> Status: {t.status}
              </Popup>
            </Marker>
          ))}

          {/* Incident Zones */}
          {incidents.map(i => (
            <Circle 
              key={i.id} 
              center={[i.lat, i.lng]} 
              radius={500} 
              pathOptions={{ color: 'red', fillColor: '#f00', fillOpacity: 0.2 }} 
            >
              <Popup>Warning: {i.type} Reported</Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveMap;

```

**Add this to `dashboard/src/index.css` for the Phenomenal UI look:**

```css
.live-map-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.map-header h1 {
  font-size: 2rem;
  color: #2D3748;
  margin-bottom: 0.5rem;
}

.map-header p {
  color: #718096;
}

.map-wrapper {
  flex: 1;
  min-height: 500px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 4px solid white; /* Nice white frame */
}

```

### 3. Update `Sidebar.jsx` (Ensure it fits)

Make sure your sidebar CSS is set to work with Flexbox.

**File:** `dashboard/src/components/sidebar.css`

```css
.sidebar {
  width: 260px;
  min-width: 260px; /* Prevents shrinking */
  height: 100vh;
  background: #1F1D36; /* Dark theme */
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative; /* Not fixed anymore */
  z-index: 10;
  box-shadow: 4px 0 15px rgba(0,0,0,0.1);
}

/* Ensure the rest of your sidebar styles (logo, links) are preserved */
.sidebar-logo { margin-bottom: 2rem; font-size: 1.5rem; font-weight: bold; }
.nav-item { padding: 12px 15px; display: flex; align-items: center; gap: 10px; color: #a0aec0; text-decoration: none; border-radius: 10px; margin-bottom: 5px; transition: 0.3s; }
.nav-item:hover, .nav-item.active { background: #6C63FF; color: white; transform: translateX(5px); }

```

### Summary of Changes:

1. **Filters Removed:** The `LiveMap.jsx` file no longer has input fields or checkboxes for filtering.
2. **No Overlap:** By using `display: flex` in `MainLayout.jsx` and removing `position: fixed` from the sidebar, the two elements will naturally sit next to each other.
3. **Phenomenal UI:** Added a soft gradient background, rounded corners, and a white frame around the map to make it pop.


Here are the updated files. I have refactored the layout to use **Flexbox**, which natively solves the overlapping issue by allocating space for the sidebar. I also removed all "hide/toggle" functionality so the sidebar remains open permanently.

### 1. `dashboard/src/layout/MainLayout.jsx`

*Refactored to use a flex container. Removed state and toggle logic.*

```jsx
import Sidebar from "../components/Sidebar";
import Header from "./Header";
import "../App.css"; // Ensure global layout styles are applied

export default function MainLayout({ children }) {
  return (
    <div className="app-container">
      {/* Sidebar is now always rendered */}
      <Sidebar />

      {/* Wrapper for Header and Page Content */}
      <div className="main-content-wrapper">
        <Header />
        <main className="main-content-area">
          {children}
        </main>
      </div>
    </div>
  );
}

```

### 2. `dashboard/src/components/Sidebar.jsx`

*Removed `isOpen` prop and conditional classes.*

```jsx
import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        SafeTour<span style={{ color: '#4f46e5' }}>AI</span>
      </div>

      <div className="nav-links">
        <NavLink to="/dashboard" className="menu-item">
          <span className="icon">📊</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/live-map" className="menu-item">
          <span className="icon">🗺️</span>
          <span>Live Map</span>
        </NavLink>

        <NavLink to="/alerts" className="menu-item">
          <span className="icon">🚨</span>
          <span>Alerts & SOS</span>
        </NavLink>

        <NavLink to="/verification" className="menu-item">
          <span className="icon">🆔</span>
          <span>Verification</span>
        </NavLink>
      </div>
    </aside>
  );
}

```

### 3. `dashboard/src/components/sidebar.css`

*Changed positioning to `sticky` to prevent overlap while staying in view.*

```css
/* SIDEBAR CONTAINER */
.sidebar {
  width: 260px;
  height: 100vh; /* Takes full viewport height */
  position: sticky;
  top: 0;
  left: 0;
  
  /* Visual Styling */
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 30px 15px;
  z-index: 50;
  flex-shrink: 0; /* Prevents sidebar from being squashed */
  box-shadow: 4px 0 24px rgba(0,0,0,0.02);
}

/* HEADER AREA */
.sidebar-header {
  margin-bottom: 40px;
  padding: 0 15px;
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.5px;
}

/* LINKS */
.nav-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px 20px;
  text-decoration: none;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background: #f8fafc;
  color: #4f46e5;
  transform: translateX(5px);
}

.menu-item.active {
  background: #eff6ff;
  color: #4f46e5;
  box-shadow: 0 2px 10px rgba(79, 70, 229, 0.1);
}

.icon {
  font-size: 1.2rem;
}

```

### 4. `dashboard/src/layout/Header.jsx`

*Removed the hamburger/hide button.*

```jsx
export default function Header() {
  return (
    <header className="app-header">
      {/* LEFT */}
      <div className="header-left">
        {/* Menu button removed */}
        <span className="logo">🌊 Tourist Safety System</span>
      </div>

      {/* CENTER */}
      <div className="header-center">
        <input
          type="text"
          placeholder="Search analyses, datasets..."
        />
      </div>

      {/* RIGHT */}
      <div className="header-right">
        <span>Help</span>
        <span>Docs</span>
        <span>Feedback</span>
      </div>
    </header>
  );
}

```

### 5. `dashboard/src/App.css`

*Sets up the flex container so sidebar and content sit side-by-side.*

```css
/* ================= LAYOUT ================= */
.app-container {
  display: flex;
  background-color: #f8fafc;
  min-height: 100vh;
  width: 100%;
}

.main-content-wrapper {
  flex: 1; /* Takes remaining space next to sidebar */
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 0; /* Prevents flex overflow issues */
}

/* ================= HEADER ================= */
.app-header {
  position: sticky;
  top: 0;
  height: 70px;
  
  /* Glass Effect */
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid #e2e8f0;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 40;
}

/* LEFT */
.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}

/* CENTER - SEARCH */
.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 40px;
}

.header-center input {
  width: 100%;
  max-width: 400px;
  padding: 10px 20px;
  border-radius: 99px;
  border: 1px solid #cbd5e1;
  background: #f1f5f9;
  color: #334155;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.header-center input:focus {
  outline: none;
  background: white;
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
}

/* RIGHT */
.header-right {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
  cursor: pointer;
}

/* MAIN CONTENT AREA */
.main-content-area {
  padding: 30px;
  flex: 1;
}

```