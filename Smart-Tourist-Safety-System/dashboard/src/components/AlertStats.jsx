export default function AlertStats({ alerts }) {
  return (
    <div className="stats-row">
      <div className="stat-card red">
        🔴 Active Alerts
        <h3>{alerts.filter(a => a.status !== "Resolved").length}</h3>
      </div>

      <div className="stat-card orange">
        🟠 Pending Incidents
        <h3>{alerts.filter(a => a.status === "New").length}</h3>
      </div>

      <div className="stat-card green">
        🟢 Resolved Today
        <h3>{alerts.filter(a => a.status === "Resolved").length}</h3>
      </div>

      <div className="stat-card blue">
        🚔 Units Engaged
        <h3>4</h3>
      </div>
    </div>
  );
}
