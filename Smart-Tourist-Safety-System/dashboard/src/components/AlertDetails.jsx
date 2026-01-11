import Timeline from "./Timeline";

export default function AlertDetails({ alert, onClose }) {
  return (
    <div className="alert-details">
      <button className="close" onClick={onClose}>✖</button>

      <h3>{alert.touristName}</h3>
      <p><b>Tourist ID:</b> {alert.touristId}</p>
      <p><b>Location:</b> {alert.location}</p>

      {/* 🔷 ACTION BUTTONS */}
      <div className="actions">
        <button>✅ Acknowledge</button>
        <button>🚔 Assign Unit</button>
        <button>📞 Call Tourist</button>
        <button>📄 Generate E-FIR</button>
        <button className="resolve">✔ Resolve</button>
      </div>

      {/* 🔷 TIMELINE */}
      <Timeline timeline={alert.timeline} />
    </div>
  );
}
