
// import { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// /* ================= FIX LEAFLET ICON ================= */
// // Ensures markers appear correctly in React
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
// });

// /* ================= MOCK DATA (Prevent Crashes) ================= */
// const highRiskZones = [
//   { id: 1, lat: 28.6129, lng: 77.2295, radius: 500, label: "Crowded Market" },
//   { id: 2, lat: 28.5457, lng: 77.1928, radius: 800, label: "Construction Zone" },
// ];

// export default function LiveMap() {
//   const [position, setPosition] = useState([28.6139, 77.2090]); // Default: New Delhi

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((pos) => {
//         setPosition([pos.coords.latitude, pos.coords.longitude]);
//       });
//     }
//   }, []);

//   const simulateBreach = () => {
//     alert("⚠️ Simulation: Tourist #102 has entered a High-Risk Zone!");
//   };

//   return (
//     <MainLayout>
//       <div style={styles.header}>
//         <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#1e293b" }}>Live Tourist Tracking</h2>
//         <p style={{ color: "#64748b", margin: "5px 0 0" }}>Real-time geospatial monitoring and geofencing</p>
//       </div>

//       <div className="wrapper" style={styles.wrapper}>
        
//         {/* STATS OVERLAY */}
//         <div style={styles.stats}>
//           <div style={styles.statItem}>
//             <span>📡 Active:</span> <strong>12</strong>
//           </div>
//           <div style={styles.statItem}>
//             <span>⚠️ Zones:</span> <strong>{highRiskZones.length}</strong>
//           </div>
//         </div>

//         {/* MAP */}
//         <div className="mapBox" style={styles.mapBox}>
//           <MapContainer 
//             center={position} 
//             zoom={13} 
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//               url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
//             />
            
//             {/* User Location */}
//             <Marker position={position}>
//               <Popup>Center of Command</Popup>
//             </Marker>

//             {/* High Risk Zones */}
//             {highRiskZones.map(zone => (
//               <Circle 
//                 key={zone.id}
//                 center={[zone.lat, zone.lng]} 
//                 radius={zone.radius} 
//                 pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2 }} 
//               >
//                 <Popup>High Risk Zone: {zone.label}</Popup>
//               </Circle>
//             ))}
//           </MapContainer>
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
//     height: "calc(100vh - 200px)", // Dynamic height relative to screen
//     minHeight: "500px",
//     background: "white",
//     borderRadius: "20px",
//     overflow: "hidden",
//     boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
//     border: "1px solid #e2e8f0",
//     position: "relative",
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
//     background: "rgba(255, 255, 255, 0.95)",
//     backdropFilter: "blur(4px)",
//     padding: "10px 15px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//     zIndex: 400, // Must be higher than Leaflet tiles
//     display: "flex",
//     gap: "15px",
//     border: "1px solid #e2e8f0",
//     fontSize: "0.9rem",
//   },
//   statItem: {
//     display: "flex",
//     alignItems: "center",
//     gap: "5px",
//     color: "#334155",
//   },
//   simButton: {
//     marginTop: "20px",
//     padding: "12px 24px",
//     background: "#3b82f6",
//     color: "white",
//     border: "none",
//     borderRadius: "12px",
//     cursor: "pointer",
//     fontWeight: "600",
//     boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
//     transition: "transform 0.2s",
//   }
// };
import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../api/apiClient";

// Fix: Default Leaflet Icons are broken in React, this fixes them
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom RED Icon for Panic Alerts
const sosIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export default function LiveMap() {
  const [alerts, setAlerts] = useState([]);

  // Fetch Alerts from Backend
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get("/alerts");
        // Only show alerts that actually have GPS coordinates
        const validAlerts = res.data.filter(a => a.latitude && a.longitude);
        setAlerts(validAlerts);
      } catch (err) {
        console.error("Error fetching map alerts:", err);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // Update map every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <div style={{ padding: "20px", height: "calc(100vh - 80px)" }}>
        <h2 className="page-title">Live Tracking Map</h2>
        
        <div style={{ 
          height: "100%", 
          width: "100%", 
          borderRadius: "15px", 
          overflow: "hidden", 
          border: "1px solid rgba(255,255,255,0.2)",
          position: "relative"
        }}>
          <MapContainer 
            center={[20.5937, 78.9629]} // Default Center (India)
            zoom={5} 
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {alerts.map((alert) => (
              <Marker 
                key={alert.id} 
                position={[alert.latitude, alert.longitude]}
                icon={sosIcon} // Shows RED marker
              >
                <Popup>
                  <div style={{ textAlign: "center", minWidth: "150px" }}>
                    <h3 style={{ color: "red", margin: "0 0 5px 0", fontWeight: "bold" }}>🚨 {alert.alert_type}</h3>
                    <p style={{ margin: "5px 0", fontSize: "14px" }}>{alert.message}</p>
                    <hr style={{ margin: "8px 0", border: "0", borderTop: "1px solid #ccc" }}/>
                    <small style={{ color: "#666" }}>{new Date(alert.timestamp).toLocaleString()}</small>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Legend Overlay */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '20px', 
            background: 'rgba(30, 30, 40, 0.9)', 
            backdropFilter: 'blur(5px)',
            padding: '15px', 
            borderRadius: '10px', 
            color: 'white', 
            zIndex: 1000,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#ccc' }}>LIVE STATUS</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" height="20" alt="Red Marker" />
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Active SOS Signal</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}