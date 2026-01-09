
// import { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// /* ================= FIX LEAFLET ICON ================= */
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
// });

// /* ================= CUSTOM ICONS ================= */
// const touristIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//   iconSize: [32, 32],
// });

// const alertIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/564/564619.png",
//   iconSize: [32, 32],
// });

// /* ================= MOCK DATA (fallback) ================= */
// const mockTourists = [
//   { id: "T-101", lat: 27.1751, lng: 78.0421, name: "Alice Johnson" },
//   { id: "T-102", lat: 26.9124, lng: 75.7873, name: "Bob Smith" },
// ];

// const mockAlerts = [
//   { id: "A-001", lat: 27.176, lng: 78.043, type: "SOS", message: "Medical Emergency" },
// ];

// const highRiskZones = [
//   { lat: 27.18, lng: 78.04, radius: 500 }, // Near Taj Mahal
// ];

// export default function LiveMap() {
//   const [tourists, setTourists] = useState(mockTourists);
//   const [alerts, setAlerts] = useState(mockAlerts);

//   // Simulation: Move tourists slightly every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTourists((prev) =>
//         prev.map((t) => ({
//           ...t,
//           lat: t.lat + (Math.random() - 0.5) * 0.001,
//           lng: t.lng + (Math.random() - 0.5) * 0.001,
//         }))
//       );
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const simulateBreach = () => {
//     alert("⚠️ SIMULATION: Tourist T-102 entered a High-Risk Zone!");
//   };

//   return (
//     <MainLayout>
//       <div style={styles.header}>
//         <h2>Live Tourist Tracking Map</h2>
//         <p style={{ opacity: 0.7 }}>Real-time location monitoring of tourists and active alerts.</p>
//       </div>

//       <div style={styles.wrapper}>
//         {/* ===== MAP CONTAINER ===== */}
//         <div style={styles.mapBox}>
//           <MapContainer
//             center={[27.1751, 78.0421]}
//             zoom={13}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />

//             {/* Render Tourists */}
//             {tourists.map((t) => (
//               <Marker key={t.id} position={[t.lat, t.lng]} icon={touristIcon}>
//                 <Popup>
//                   <b>{t.name}</b> <br /> ID: {t.id}
//                 </Popup>
//               </Marker>
//             ))}

//             {/* Render Alerts */}
//             {alerts.map((a) => (
//               <Marker key={a.id} position={[a.lat, a.lng]} icon={alertIcon}>
//                 <Popup>
//                   <b>🚨 {a.type}</b> <br /> {a.message}
//                 </Popup>
//               </Marker>
//             ))}

//             {/* Render Safe/Risk Zones */}
//             {highRiskZones.map((z, i) => (
//               <Circle
//                 key={i}
//                 center={[z.lat, z.lng]}
//                 radius={z.radius}
//                 pathOptions={{ color: "red", fillOpacity: 0.15 }}
//               />
//             ))}
//           </MapContainer>

//           {/* ===== FLOATING STATS OVERLAY ===== */}
//           <div style={styles.stats}>
//             <div style={styles.statItem}>👤 Tourists: <strong>{tourists.length}</strong></div>
//             <div style={styles.statItem}>🚨 Alerts: <strong>{alerts.length}</strong></div>
//             <div style={styles.statItem}>⚠ Zones: <strong>{highRiskZones.length}</strong></div>
//           </div>
//         </div>
//       </div>

//       <button onClick={simulateBreach} style={styles.simButton}>
//         🚧 Simulate Boundary Breach
//       </button>
//     </MainLayout>
//   );
// }

// /* ================= STYLES ================= */
// const styles = {
//   header: {
//     marginBottom: "1.5rem",
//   },
//   wrapper: {
//     display: "flex",
//     flexDirection: "column",
//     height: "75vh", // Fixed height for map area
//     background: "white",
//     borderRadius: "20px",
//     overflow: "hidden",
//     boxShadow: "var(--shadow-lg)",
//     border: "1px solid rgba(0,0,0,0.05)",
//   },
//   mapBox: {
//     flex: 1,
//     position: "relative",
//     zIndex: 1,
//   },
//   stats: {
//     position: "absolute",
//     top: "20px",
//     right: "20px",
//     background: "rgba(255, 255, 255, 0.9)",
//     backdropFilter: "blur(10px)",
//     padding: "15px 20px",
//     borderRadius: "15px",
//     boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//     zIndex: 999, // Ensure it sits above the map
//     display: "flex",
//     gap: "20px",
//     border: "1px solid rgba(255,255,255,0.5)",
//   },
//   statItem: {
//     fontSize: "0.95rem",
//     color: "var(--text-primary)",
//   },
//   simButton: {
//     width: "100%",
//     padding: "15px",
//     backgroundColor: "var(--primary-color)",
//     color: "white",
//     border: "none",
//     borderRadius: "12px",
//     marginTop: "20px",
//     fontWeight: "600",
//     fontSize: "1rem",
//     cursor: "pointer",
//     boxShadow: "var(--shadow-sm)",
//     transition: "transform 0.2s",
//   },
// };
import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= FIX LEAFLET ICON ================= */
// Ensures markers appear correctly in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

/* ================= MOCK DATA (Prevent Crashes) ================= */
const highRiskZones = [
  { id: 1, lat: 28.6129, lng: 77.2295, radius: 500, label: "Crowded Market" },
  { id: 2, lat: 28.5457, lng: 77.1928, radius: 800, label: "Construction Zone" },
];

export default function LiveMap() {
  const [position, setPosition] = useState([28.6139, 77.2090]); // Default: New Delhi

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  const simulateBreach = () => {
    alert("⚠️ Simulation: Tourist #102 has entered a High-Risk Zone!");
  };

  return (
    <MainLayout>
      <div style={styles.header}>
        <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#1e293b" }}>Live Tourist Tracking</h2>
        <p style={{ color: "#64748b", margin: "5px 0 0" }}>Real-time geospatial monitoring and geofencing</p>
      </div>

      <div className="wrapper" style={styles.wrapper}>
        
        {/* STATS OVERLAY */}
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span>📡 Active:</span> <strong>12</strong>
          </div>
          <div style={styles.statItem}>
            <span>⚠️ Zones:</span> <strong>{highRiskZones.length}</strong>
          </div>
        </div>

        {/* MAP */}
        <div className="mapBox" style={styles.mapBox}>
          <MapContainer 
            center={position} 
            zoom={13} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            
            {/* User Location */}
            <Marker position={position}>
              <Popup>Center of Command</Popup>
            </Marker>

            {/* High Risk Zones */}
            {highRiskZones.map(zone => (
              <Circle 
                key={zone.id}
                center={[zone.lat, zone.lng]} 
                radius={zone.radius} 
                pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2 }} 
              >
                <Popup>High Risk Zone: {zone.label}</Popup>
              </Circle>
            ))}
          </MapContainer>
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
    height: "calc(100vh - 200px)", // Dynamic height relative to screen
    minHeight: "500px",
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
    position: "relative",
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
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(4px)",
    padding: "10px 15px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    zIndex: 400, // Must be higher than Leaflet tiles
    display: "flex",
    gap: "15px",
    border: "1px solid #e2e8f0",
    fontSize: "0.9rem",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#334155",
  },
  simButton: {
    marginTop: "20px",
    padding: "12px 24px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
    transition: "transform 0.2s",
  }
};