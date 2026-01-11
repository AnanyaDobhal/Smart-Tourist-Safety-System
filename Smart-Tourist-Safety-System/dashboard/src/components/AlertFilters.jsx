export default function AlertFilters() {
  return (
    <div className="filters-row">

      <select>
        <option value="">All Alerts</option>
        <option value="Panic">🔴 Panic</option>
        <option value="AI">🟠 AI Anomaly</option>
        <option value="Geo">🟡 Geo-fence</option>
      </select>

      <select>
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      <select>
        <option value="">All Risk</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input type="text" placeholder="Area / District" />

      <input type="datetime-local" />

      <button className="reset-btn">Clear</button>

    </div>
  );
}
