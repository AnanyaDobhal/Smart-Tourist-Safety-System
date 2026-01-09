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
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  iconSize: [32, 32],
});

const alertIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/564/564619.png",
  iconSize: [32, 32],
});

/* ================= MOCK DATA (fallback) ================= */
const mockTourists = [
  { id: "T-101", lat: 28.6139, lng: 77.209, status: "Safe" },
  { id: "T-102", lat: 28.5355, lng: 77.391, status: "Safe" },
];

const mockAlerts = [
  {
    id: "A-1",
    type: "Panic",
    lat: 28.7041,
    lng: 77.1025,
    time: "2 mins ago",
  },
];

const highRiskZones = [
  { lat: 28.6448, lng: 77.2167, radius: 500 },
];

/* ================= COMPONENT ================= */
export default function LiveMap() {
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [showTourists, setShowTourists] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);
  const [showZones, setShowZones] = useState(true);
<Circle 
  center={[27.1751, 78.0421]} // Taj Mahal
  pathOptions={{ fillColor: 'blue', color: 'blue' }} 
  radius={1000} // 1km radius
/>
  /* ========== FETCH FROM BACKEND ========== */
  useEffect(() => {
    async function fetchData() {
      try {
        const tRes = await fetch("http://localhost:5000/api/tourists");
        const aRes = await fetch("http://localhost:5000/api/alerts");

        setTourists(await tRes.json());
        setAlerts(await aRes.json());
      } catch {
        // fallback for hackathon demo
        setTourists(mockTourists);
        setAlerts(mockAlerts);
      }
    }

    fetchData();
  }, []);
const simulateBreach = async () => {
  await fetch('http://localhost:5000/api/simulate-breach', { method: 'POST' });
  alert("⚠️ Geofence Breach Detected!");
  window.location.reload();
};
  return (
    
    <MainLayout>
      <div style={styles.wrapper}>
        {/* ===== FILTER PANEL ===== */}
        <div style={styles.filters}>
          <h4>Map Filters</h4>
          <label>
            <input
              type="checkbox"
              checked={showTourists}
              onChange={() => setShowTourists(!showTourists)}
            />
            Show Tourists
          </label>
          <label>
            <input
              type="checkbox"
              checked={showAlerts}
              onChange={() => setShowAlerts(!showAlerts)}
            />
            Show Alerts
          </label>
          <label>
            <input
              type="checkbox"
              checked={showZones}
              onChange={() => setShowZones(!showZones)}
            />
            Show High-Risk Zones
          </label>
        </div>

        {/* ===== MAP ===== */}
        <div style={styles.mapBox}>
          <MapContainer
            center={[28.6139, 77.209]}
            zoom={11}
            style={{ height: "75vh", width: "100%" }}
          >
            <TileLayer
  attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
  /* ✅ THIS URL GIVES THE COOL DARK THEME */
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
/>
            {/* TOURISTS */}
            {showTourists &&
              tourists.map((t) => (
                <Marker
                  key={t.id}
                  position={[t.lat, t.lng]}
                  icon={touristIcon}
                >
                  <Popup>
                    <b>Tourist ID:</b> {t.id} <br />
                    <b>Status:</b> {t.status}
                  </Popup>
                </Marker>
              ))}

            {/* ALERTS */}
            {showAlerts &&
              alerts.map((a) => (
                <Marker
                  key={a.id}
                  position={[a.lat, a.lng]}
                  icon={alertIcon}
                >
                  <Popup>
                    <b>Alert:</b> {a.type} <br />
                    <b>Time:</b> {a.time}
                  </Popup>
                </Marker>
              ))}

            {/* HIGH RISK ZONES */}
            {showZones &&
              highRiskZones.map((z, i) => (
                <Circle
                  key={i}
                  center={[z.lat, z.lng]}
                  radius={z.radius}
                  pathOptions={{ color: "red", fillOpacity: 0.15 }}
                />
              ))}
          </MapContainer>

          {/* ===== STATS OVERLAY ===== */}
          <div style={styles.stats}>
            <div>👤 Tourists: {tourists.length}</div>
            <div>🚨 Alerts: {alerts.length}</div>
            <div>⚠ Zones: {highRiskZones.length}</div>
          </div>
        </div>
      </div>
      <button onClick={simulateBreach} style={{ width: '100%', padding: '10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '5px', marginTop: '10px', fontWeight: 'bold', cursor: 'pointer' }} > 🚧 Simulate Boundary Breach </button>
    </MainLayout>
  );
}

/* ================= STYLES ================= */
const styles = {
  wrapper: {
    display: "flex",
    gap: "20px",
    height: "calc(150vh - 250px)",
  },

  filters: {
    width: "220px",
    background: "#f3f3ffff",
    padding: "16px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  mapBox: {
    flex: 1,
    position: "relative",
    borderRadius: "12px",
    overflow: "hidden",
  },

  stats: {
    position: "absolute",
    bottom: "16px",
    left: "16px",
    background: "#ffffff",
    padding: "10px 14px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    fontSize: "14px",
    display: "flex",
    gap: "14px",
  },
};
