<<<<<<< HEAD
// import MainLayout from "../layout/MainLayout";
// import StatCard from "../components/StatCard";
// import toast, { Toaster } from 'react-hot-toast';
// const Tourist = require('../models/Tourist'); // <--- MUST SAY TOURIST
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   CartesianGrid
// } from "recharts";

// const incidentData = [
//   { day: "Mon", incidents: 2 },
//   { day: "Tue", incidents: 4 },
//   { day: "Wed", incidents: 1 },
//   { day: "Thu", incidents: 5 },
//   { day: "Fri", incidents: 3 },
//   { day: "Sat", incidents: 7 },
//   { day: "Sun", incidents: 6 },
// ];

// const alertData = [
//   { name: "Panic", value: 3 },
//   { name: "Geo-fence", value: 2 },
//   { name: "Inactivity", value: 1 },
// ];

// const COLORS = ["#FF6584", "#FFBC42", "#6C63FF"];

// export default function Dashboard() {
//   const triggerSOS = async () => {
//     const loadingToast = toast.loading('Initiating Emergency Protocols...');
//     try {
//       // Simulate API call
//       const response = await fetch('http://localhost:5000/api/simulate-sos', { method: 'POST' });
      
//       // For demo purposes, we'll assume success even if backend isn't running
//       setTimeout(() => {
//         toast.success('🚨 SOS SIGNAL BROADCASTED!', {
//           id: loadingToast,
//           duration: 5000,
//           style: { background: '#FF4D4D', color: '#fff', fontWeight: 'bold' },
//           iconTheme: { primary: '#fff', secondary: '#FF4D4D' },
//         });
//       }, 1000);
      
//     } catch (error) {
//       toast.error('Connection Failed', { id: loadingToast });
//     }
//   };

//   return (
//     <MainLayout>
//       <Toaster position="top-center" reverseOrder={false} />
      
//       <div className="dashboard-wrapper">
//         <h2 className="page-title">Mission Control</h2>

//         {/* Stats Row */}
//         <div className="stats-grid">
//           <div className="glass-card stat-box">
//             <h3>Active Tourists</h3>
//             <p className="stat-value neon-blue">1,245</p>
//             <span className="stat-trend positive">↑ 12% today</span>
//           </div>
//           <div className="glass-card stat-box">
//             <h3>Active Alerts</h3>
//             <p className="stat-value neon-red">5</p>
//             <span className="stat-trend negative">Attention Needed</span>
//           </div>
//           <div className="glass-card stat-box">
//             <h3>Safe Zones</h3>
//             <p className="stat-value neon-green">98%</p>
//             <span className="stat-trend positive">Optimal</span>
//           </div>
//           <div className="glass-card stat-box">
//             <h3>Response Units</h3>
//             <p className="stat-value neon-yellow">24</p>
//             <span className="stat-trend">Ready</span>
//           </div>
//         </div>

//         {/* Charts Row */}
//         <div className="charts-grid">
//           {/* Line Chart */}
//           <div className="glass-card chart-box">
//             <h3>Weekly Incident Trends</h3>
//             <div style={{ width: '100%', height: 300 }}>
//               <ResponsiveContainer>
//                 <LineChart data={incidentData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
//                   <XAxis dataKey="day" stroke="#aaa" tick={{fill: '#ccc'}} />
//                   <YAxis stroke="#aaa" tick={{fill: '#ccc'}} />
//                   <Tooltip 
//                     contentStyle={{ backgroundColor: '#1F1D36', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px' }}
//                     itemStyle={{ color: '#fff' }}
//                   />
//                   <Line 
//                     type="monotone" 
//                     dataKey="incidents" 
//                     stroke="#43D9AD" 
//                     strokeWidth={3}
//                     dot={{fill: '#43D9AD', r: 6}} 
//                     activeDot={{r: 8}}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie Chart */}
//           <div className="glass-card chart-box">
//             <h3>Alert Distribution</h3>
//             <div style={{ width: '100%', height: 300 }}>
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie
//                     data={alertData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={100}
//                     paddingAngle={5}
//                     dataKey="value"
//                   >
//                     {alertData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip 
//                     contentStyle={{ backgroundColor: '#1F1D36', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px' }} 
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="chart-legend">
//                 {alertData.map((entry, index) => (
//                   <div key={index} className="legend-item">
//                     <span className="dot" style={{background: COLORS[index]}}></span>
//                     <span>{entry.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* SOS Floating Button */}
//       <button onClick={triggerSOS} className="sos-button">
//         <span>🚨</span> SIMULATE SOS
//       </button>

//       {/* Embedded CSS for Dashboard specificity */}
//       <style>{`
//         .dashboard-wrapper {
//           padding: 0 10px;
//         }
//         .page-title {
//           font-size: 2rem;
//           margin-bottom: 30px;
//           font-weight: 700;
//           color: white;
//         }
//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//           gap: 20px;
//           margin-bottom: 30px;
//         }
//         .charts-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//           gap: 30px;
//         }
//         .glass-card {
//           background: var(--glass-bg);
//           backdrop-filter: blur(12px);
//           border: 1px solid var(--glass-border);
//           border-radius: 20px;
//           padding: 25px;
//           box-shadow: 0 8px 30px rgba(0,0,0,0.1);
//           color: white;
//         }
//         .stat-box h3 {
//           font-size: 0.9rem;
//           color: var(--text-muted);
//           text-transform: uppercase;
//           margin-bottom: 10px;
//         }
//         .stat-value {
//           font-size: 2.5rem;
//           font-weight: 700;
//           margin-bottom: 5px;
//         }
//         .neon-blue { text-shadow: 0 0 10px rgba(108, 99, 255, 0.5); color: #8CA0FF; }
//         .neon-red { text-shadow: 0 0 10px rgba(255, 77, 77, 0.5); color: #FF8080; }
//         .neon-green { text-shadow: 0 0 10px rgba(67, 217, 173, 0.5); color: #70FFCF; }
//         .neon-yellow { text-shadow: 0 0 10px rgba(255, 188, 66, 0.5); color: #FFE08A; }
        
//         .chart-legend {
//           display: flex;
//           justify-content: center;
//           gap: 15px;
//           margin-top: 10px;
//         }
//         .legend-item {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           font-size: 0.9rem;
//           color: var(--text-muted);
//         }
//         .dot {
//           width: 10px;
//           height: 10px;
//           border-radius: 50%;
//         }

//         /* SOS Button */
//         .sos-button {
//           position: fixed;
//           bottom: 40px;
//           right: 40px;
//           background: linear-gradient(135deg, #FF4D4D, #C41C1C);
//           color: white;
//           border: none;
//           padding: 20px 40px;
//           border-radius: 50px;
//           font-size: 1.2rem;
//           font-weight: 800;
//           cursor: pointer;
//           box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.7);
//           animation: pulse-red 2s infinite;
//           z-index: 9999;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           transition: transform 0.2s;
//         }
//         .sos-button:hover {
//           transform: scale(1.05);
//         }
//         @keyframes pulse-red {
//           0% { box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.7); }
//           70% { box-shadow: 0 0 0 20px rgba(255, 77, 77, 0); }
//           100% { box-shadow: 0 0 0 0 rgba(255, 77, 77, 0); }
//         }
//       `}</style>
//     </MainLayout>
//   );
// }
import React, { useEffect, useState } from 'react';
import MainLayout from "../layout/MainLayout";
import api from '../api/apiClient'; // Ensure you have this file
=======
import MainLayout from "../layout/MainLayout";
import StatCard from "../components/StatCard";
>>>>>>> da8099354c084b953045624b58d63513c696db65
import toast, { Toaster } from 'react-hot-toast';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from "recharts";

const incidentData = [
  { day: "Mon", incidents: 2 },
  { day: "Tue", incidents: 4 },
  { day: "Wed", incidents: 1 },
  { day: "Thu", incidents: 5 },
  { day: "Fri", incidents: 3 },
  { day: "Sat", incidents: 7 },
  { day: "Sun", incidents: 6 },
];

<<<<<<< HEAD
const COLORS = ["#FF6584", "#FFBC42", "#6C63FF"];

export default function Dashboard() {
  // 1. STATE FOR REAL DATA
  const [activeCount, setActiveCount] = useState(0);
  const [alerts, setAlerts] = useState([]);

  // 2. FETCH DATA (Poll every 2 seconds for fast updates)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/alerts');
        setAlerts(res.data);
        setActiveCount(res.data.length);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  // Keep your simulation button working just in case
  const triggerSOS = async () => {
    const loadingToast = toast.loading('Initiating Emergency Protocols...');
    try {
=======
const alertData = [
  { name: "Panic", value: 3 },
  { name: "Geo-fence", value: 2 },
  { name: "Inactivity", value: 1 },
];

const COLORS = ["#FF6584", "#FFBC42", "#6C63FF"];

export default function Dashboard() {
  const triggerSOS = async () => {
    const loadingToast = toast.loading('Initiating Emergency Protocols...');
    try {
      // Simulate API call
      const response = await fetch('http://localhost:5000/api/simulate-sos', { method: 'POST' });
      
      // For demo purposes, we'll assume success even if backend isn't running
>>>>>>> da8099354c084b953045624b58d63513c696db65
      setTimeout(() => {
        toast.success('🚨 SOS SIGNAL BROADCASTED!', {
          id: loadingToast,
          duration: 5000,
          style: { background: '#FF4D4D', color: '#fff', fontWeight: 'bold' },
          iconTheme: { primary: '#fff', secondary: '#FF4D4D' },
        });
      }, 1000);
<<<<<<< HEAD
=======
      
>>>>>>> da8099354c084b953045624b58d63513c696db65
    } catch (error) {
      toast.error('Connection Failed', { id: loadingToast });
    }
  };

  return (
    <MainLayout>
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="dashboard-wrapper">
        <h2 className="page-title">Mission Control</h2>

        {/* Stats Row */}
        <div className="stats-grid">
          <div className="glass-card stat-box">
            <h3>Active Tourists</h3>
            <p className="stat-value neon-blue">1,245</p>
            <span className="stat-trend positive">↑ 12% today</span>
          </div>
<<<<<<< HEAD

          {/* ✅ UPDATED: Shows REAL Database Count */}
          <div className="glass-card stat-box">
            <h3>Active Alerts</h3>
            <p className="stat-value neon-red">{activeCount}</p>
            <span className="stat-trend negative">
              {activeCount > 0 ? "CRITICAL ACTION REQUIRED" : "Systems Normal"}
            </span>
          </div>

=======
          <div className="glass-card stat-box">
            <h3>Active Alerts</h3>
            <p className="stat-value neon-red">5</p>
            <span className="stat-trend negative">Attention Needed</span>
          </div>
>>>>>>> da8099354c084b953045624b58d63513c696db65
          <div className="glass-card stat-box">
            <h3>Safe Zones</h3>
            <p className="stat-value neon-green">98%</p>
            <span className="stat-trend positive">Optimal</span>
          </div>
          <div className="glass-card stat-box">
            <h3>Response Units</h3>
            <p className="stat-value neon-yellow">24</p>
            <span className="stat-trend">Ready</span>
          </div>
        </div>

<<<<<<< HEAD
        {/* ✅ NEW: LIVE FEED (Uses your 'glass-card' style) */}
        {alerts.length > 0 && (
          <div className="glass-card" style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#FF4D4D', marginBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              🚨 LIVE EMERGENCY FEED
            </h3>
            <div className="alert-feed">
              {alerts.map((alert) => (
                <div key={alert.id} className="alert-item">
                  <div className="alert-icon">⚠️</div>
                  <div className="alert-info">
                    <span className="alert-type">{alert.alert_type}</span>
                    <span className="alert-msg">{alert.message}</span>
                    <span className="alert-loc">Lat: {alert.latitude?.toFixed(4)}, Lng: {alert.longitude?.toFixed(4)}</span>
                  </div>
                  <span className="alert-time">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Charts Row (Your Original Charts) */}
        <div className="charts-grid">
=======
        {/* Charts Row */}
        <div className="charts-grid">
          {/* Line Chart */}
>>>>>>> da8099354c084b953045624b58d63513c696db65
          <div className="glass-card chart-box">
            <h3>Weekly Incident Trends</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={incidentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="#aaa" tick={{fill: '#ccc'}} />
                  <YAxis stroke="#aaa" tick={{fill: '#ccc'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F1D36', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px' }}
                    itemStyle={{ color: '#fff' }}
                  />
<<<<<<< HEAD
                  <Line type="monotone" dataKey="incidents" stroke="#43D9AD" strokeWidth={3} dot={{fill: '#43D9AD', r: 6}} activeDot={{r: 8}} />
=======
                  <Line 
                    type="monotone" 
                    dataKey="incidents" 
                    stroke="#43D9AD" 
                    strokeWidth={3}
                    dot={{fill: '#43D9AD', r: 6}} 
                    activeDot={{r: 8}}
                  />
>>>>>>> da8099354c084b953045624b58d63513c696db65
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

<<<<<<< HEAD
=======
          {/* Pie Chart */}
>>>>>>> da8099354c084b953045624b58d63513c696db65
          <div className="glass-card chart-box">
            <h3>Alert Distribution</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
<<<<<<< HEAD
                  {/* I updated this to use real data count for "Panic" */}
                  <Pie
                    data={[
                      { name: "Panic", value: activeCount || 1 }, 
                      { name: "Geo-fence", value: 2 }, 
                      { name: "Inactivity", value: 1 }
                    ]}
                    cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value"
                  >
                    {incidentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1F1D36', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-legend">
                {[{ name: "Panic", value: 3 }, { name: "Geo-fence", value: 2 }, { name: "Inactivity", value: 1 }].map((entry, index) => (
=======
                  <Pie
                    data={alertData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {alertData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F1D36', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px' }} 
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="chart-legend">
                {alertData.map((entry, index) => (
>>>>>>> da8099354c084b953045624b58d63513c696db65
                  <div key={index} className="legend-item">
                    <span className="dot" style={{background: COLORS[index]}}></span>
                    <span>{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
=======
      {/* SOS Floating Button */}
>>>>>>> da8099354c084b953045624b58d63513c696db65
      <button onClick={triggerSOS} className="sos-button">
        <span>🚨</span> SIMULATE SOS
      </button>

<<<<<<< HEAD
      <style>{`
        /* YOUR ORIGINAL CSS */
        .dashboard-wrapper { padding: 0 10px; }
        .page-title { font-size: 2rem; margin-bottom: 30px; font-weight: 700; color: white; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .charts-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 30px; }
=======
      {/* Embedded CSS for Dashboard specificity */}
      <style>{`
        .dashboard-wrapper {
          padding: 0 10px;
        }
        .page-title {
          font-size: 2rem;
          margin-bottom: 30px;
          font-weight: 700;
          color: white;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px;
        }
>>>>>>> da8099354c084b953045624b58d63513c696db65
        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
          color: white;
        }
<<<<<<< HEAD
        .stat-box h3 { font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 10px; }
        .stat-value { font-size: 2.5rem; font-weight: 700; margin-bottom: 5px; }
=======
        .stat-box h3 {
          font-size: 0.9rem;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 5px;
        }
>>>>>>> da8099354c084b953045624b58d63513c696db65
        .neon-blue { text-shadow: 0 0 10px rgba(108, 99, 255, 0.5); color: #8CA0FF; }
        .neon-red { text-shadow: 0 0 10px rgba(255, 77, 77, 0.5); color: #FF8080; }
        .neon-green { text-shadow: 0 0 10px rgba(67, 217, 173, 0.5); color: #70FFCF; }
        .neon-yellow { text-shadow: 0 0 10px rgba(255, 188, 66, 0.5); color: #FFE08A; }
        
<<<<<<< HEAD
        .chart-legend { display: flex; justify-content: center; gap: 15px; margin-top: 10px; }
        .legend-item { display: flex; align-items: center; gap: 5px; font-size: 0.9rem; color: var(--text-muted); }
        .dot { width: 10px; height: 10px; border-radius: 50%; }

        .sos-button {
          position: fixed; bottom: 40px; right: 40px;
          background: linear-gradient(135deg, #FF4D4D, #C41C1C);
          color: white; border: none; padding: 20px 40px;
          border-radius: 50px; font-size: 1.2rem; font-weight: 800;
          cursor: pointer; box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.7);
          animation: pulse-red 2s infinite; z-index: 9999;
          display: flex; align-items: center; gap: 10px; transition: transform 0.2s;
        }
        .sos-button:hover { transform: scale(1.05); }
=======
        .chart-legend {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 10px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        /* SOS Button */
        .sos-button {
          position: fixed;
          bottom: 40px;
          right: 40px;
          background: linear-gradient(135deg, #FF4D4D, #C41C1C);
          color: white;
          border: none;
          padding: 20px 40px;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.7);
          animation: pulse-red 2s infinite;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: transform 0.2s;
        }
        .sos-button:hover {
          transform: scale(1.05);
        }
>>>>>>> da8099354c084b953045624b58d63513c696db65
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(255, 77, 77, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 77, 77, 0); }
        }
<<<<<<< HEAD

        /* ✅ NEW CSS FOR ALERT FEED (Matches your theme) */
        .alert-feed { max-height: 250px; overflow-y: auto; }
        .alert-item {
          display: flex; align-items: center; gap: 15px;
          padding: 15px; margin-bottom: 10px;
          background: rgba(255, 77, 77, 0.1); /* Subtle red tint */
          border-left: 4px solid #FF4D4D;
          border-radius: 8px;
        }
        .alert-icon { font-size: 1.5rem; }
        .alert-info { flex: 1; display: flex; flex-direction: column; }
        .alert-type { font-weight: bold; color: #FF8080; text-transform: uppercase; font-size: 0.9rem; }
        .alert-msg { color: #fff; font-size: 1rem; margin: 2px 0; }
        .alert-loc { color: #aaa; font-size: 0.8rem; font-family: monospace; }
        .alert-time { color: #aaa; font-size: 0.8rem; }
=======
>>>>>>> da8099354c084b953045624b58d63513c696db65
      `}</style>
    </MainLayout>
  );
}