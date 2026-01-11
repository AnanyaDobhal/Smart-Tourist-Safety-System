// // import React, { useEffect, useState } from "react";
// // import MainLayout from "../layout/MainLayout";
// // import api from "../api/apiClient";
// // import "../styles/alerts.css"; // Ensure you have your CSS file

// // export default function AlertsIncidents() {
// //   const [alerts, setAlerts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch Real Data
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await api.get("/alerts");
// //         setAlerts(res.data);
// //       } catch (err) {
// //         console.error("Failed to load alerts", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //     // Poll every 5s to keep table updated
// //     const interval = setInterval(fetchData, 5000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <MainLayout>
// //       <div className="alerts-page-wrapper">
// //         <h2 className="page-title">Alerts & Incidents Log</h2>

// //         <div className="glass-card" style={{ padding: "20px" }}>
// //           {loading ? (
// //             <p style={{ color: "white", textAlign: "center" }}>Loading incidents...</p>
// //           ) : alerts.length === 0 ? (
// //             <p style={{ color: "#aaa", textAlign: "center" }}>No active alerts found.</p>
// //           ) : (
// //             <table className="alerts-table" style={{ width: "100%", borderCollapse: "collapse", color: "white" }}>
// //               <thead>
// //                 <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", textAlign: "left" }}>
// //                   <th style={{ padding: "15px" }}>Type</th>
// //                   <th style={{ padding: "15px" }}>Message</th>
// //                   <th style={{ padding: "15px" }}>Location</th>
// //                   <th style={{ padding: "15px" }}>Time</th>
// //                   <th style={{ padding: "15px" }}>Status</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {alerts.map((alert) => (
// //                   <tr key={alert.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
// //                     <td style={{ padding: "15px" }}>
// //                       <span style={{
// //                         background: alert.alert_type === 'PANIC' ? 'rgba(255, 77, 77, 0.2)' : 'rgba(255, 188, 66, 0.2)',
// //                         color: alert.alert_type === 'PANIC' ? '#FF4D4D' : '#FFBC42',
// //                         padding: "5px 10px", borderRadius: "5px", fontWeight: "bold", fontSize: "0.8rem"
// //                       }}>
// //                         {alert.alert_type}
// //                       </span>
// //                     </td>
// //                     <td style={{ padding: "15px" }}>{alert.message}</td>
// //                     <td style={{ padding: "15px", fontFamily: "monospace", color: "#aaa" }}>
// //                       {alert.latitude?.toFixed(4)}, {alert.longitude?.toFixed(4)}
// //                     </td>
// //                     <td style={{ padding: "15px", color: "#ccc" }}>
// //                       {new Date(alert.timestamp).toLocaleString()}
// //                     </td>
// //                     <td style={{ padding: "15px" }}>
// //                       <button style={{
// //                         background: "transparent", border: "1px solid #43D9AD", color: "#43D9AD",
// //                         padding: "5px 15px", borderRadius: "20px", cursor: "pointer"
// //                       }}>
// //                         Resolve
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           )}
// //         </div>
// //       </div>
// //     </MainLayout>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import api from "../api/apiClient";
// import "../styles/alerts.css"; // ✅ Importing the CSS we just made

// export default function AlertsIncidents() {
//   const [alerts, setAlerts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch Real Data from Backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await api.get("/alerts");
//         setAlerts(res.data);
//       } catch (err) {
//         console.error("Failed to load alerts", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//     // Auto-refresh every 5 seconds
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <MainLayout>
//       <div className="alerts-page-wrapper">
//         <h2 className="page-title">Alerts & Incidents Log</h2>

//         <div className="glass-card" style={{ padding: "0px", overflow: "hidden" }}>
//           {loading ? (
//             <p style={{ color: "white", padding: "20px", textAlign: "center" }}>Loading incidents...</p>
//           ) : alerts.length === 0 ? (
//             <p style={{ color: "#aaa", padding: "20px", textAlign: "center" }}>No active alerts found.</p>
//           ) : (
//             <table className="alerts-table">
//               <thead>
//                 <tr>
//                   <th>Type</th>
//                   <th>Message</th>
//                   <th>Location (GPS)</th>
//                   <th>Time Logged</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {alerts.map((alert) => (
//                   <tr key={alert.id}>
//                     <td>
//                       <span style={{
//                         background: alert.alert_type === 'PANIC' ? 'rgba(255, 77, 77, 0.15)' : 'rgba(255, 188, 66, 0.15)',
//                         color: alert.alert_type === 'PANIC' ? '#FF4D4D' : '#FFBC42',
//                         padding: "6px 12px", 
//                         borderRadius: "20px", 
//                         fontWeight: "bold", 
//                         fontSize: "0.75rem",
//                         border: alert.alert_type === 'PANIC' ? '1px solid rgba(255, 77, 77, 0.3)' : '1px solid rgba(255, 188, 66, 0.3)'
//                       }}>
//                         {alert.alert_type}
//                       </span>
//                     </td>
//                     <td style={{ fontWeight: "500" }}>{alert.message}</td>
//                     <td style={{ fontFamily: "monospace", color: "#aaa" }}>
//                       {alert.latitude ? `${alert.latitude.toFixed(4)}, ${alert.longitude.toFixed(4)}` : "N/A"}
//                     </td>
//                     <td style={{ color: "#bbb" }}>
//                       {new Date(alert.timestamp).toLocaleString()}
//                     </td>
//                     <td>
//                       <button style={{
//                         background: "transparent", 
//                         border: "1px solid #43D9AD", 
//                         color: "#43D9AD",
//                         padding: "6px 16px", 
//                         borderRadius: "20px", 
//                         cursor: "pointer",
//                         fontSize: "0.8rem",
//                         transition: "all 0.2s"
//                       }}
//                       onMouseOver={(e) => e.target.style.background = "rgba(67, 217, 173, 0.1)"}
//                       onMouseOut={(e) => e.target.style.background = "transparent"}
//                       >
//                         RESOLVE
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </MainLayout>
//   );
// }
import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../api/apiClient";
import "../styles/alerts.css";

export default function AlertsIncidents() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  const fetchAlerts = async () => {
    try {
      const res = await api.get("/alerts");
      setAlerts(res.data);
    } catch (err) {
      console.error("Failed to load alerts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ NEW: Handle Resolve Click
  const handleResolve = async (id) => {
    try {
      // 1. Call API
      await api.put(`/alerts/${id}/resolve`);
      
      // 2. Optimistic Update (Update UI instantly without waiting for re-fetch)
      setAlerts(prev => prev.map(alert => 
        alert.id === id ? { ...alert, status: 'RESOLVED' } : alert
      ));
      
    } catch (err) {
      alert("Failed to resolve alert");
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <div className="alerts-page-wrapper">
        <h2 className="page-title">Alerts & Incidents Log</h2>

        <div className="glass-card" style={{ padding: "0px", overflow: "hidden" }}>
          {loading ? (
            <p style={{ color: "white", padding: "20px", textAlign: "center" }}>Loading incidents...</p>
          ) : alerts.length === 0 ? (
            <p style={{ color: "#aaa", padding: "20px", textAlign: "center" }}>No active alerts found.</p>
          ) : (
            <table className="alerts-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Message</th>
                  <th>Location</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert.id} style={{ opacity: alert.status === 'RESOLVED' ? 0.5 : 1 }}>
                    <td>
                      <span style={{
                        background: alert.alert_type === 'PANIC' ? 'rgba(255, 77, 77, 0.15)' : 'rgba(255, 188, 66, 0.15)',
                        color: alert.alert_type === 'PANIC' ? '#FF4D4D' : '#FFBC42',
                        padding: "6px 12px", borderRadius: "20px", fontWeight: "bold", fontSize: "0.75rem",
                        border: `1px solid ${alert.alert_type === 'PANIC' ? '#FF4D4D' : '#FFBC42'}`
                      }}>
                        {alert.alert_type}
                      </span>
                    </td>
                    <td>{alert.message}</td>
                    <td style={{ fontFamily: "monospace", color: "#aaa" }}>
                      {alert.latitude ? `${alert.latitude.toFixed(4)}, ${alert.longitude.toFixed(4)}` : "N/A"}
                    </td>
                    <td style={{ color: "#bbb" }}>
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </td>
                    <td>
                       {/* Status Badge */}
                       <span style={{ 
                         color: alert.status === 'RESOLVED' ? '#43D9AD' : '#FF4D4D',
                         fontWeight: 'bold' 
                       }}>
                         {alert.status || 'ACTIVE'}
                       </span>
                    </td>
                    <td>
                      {/* Only show button if NOT resolved */}
                      {alert.status !== 'RESOLVED' && (
                        <button 
                          onClick={() => handleResolve(alert.id)} // ✅ Click Handler
                          style={{
                            background: "transparent", 
                            border: "1px solid #43D9AD", 
                            color: "#43D9AD",
                            padding: "6px 16px", 
                            borderRadius: "20px", 
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            transition: "all 0.2s"
                          }}
                          onMouseOver={(e) => e.target.style.background = "rgba(67, 217, 173, 0.1)"}
                          onMouseOut={(e) => e.target.style.background = "transparent"}
                        >
                          RESOLVE
                        </button>
                      )}
                      {alert.status === 'RESOLVED' && (
                        <span style={{ color: '#43D9AD' }}>✓ Done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </MainLayout>
  );
}