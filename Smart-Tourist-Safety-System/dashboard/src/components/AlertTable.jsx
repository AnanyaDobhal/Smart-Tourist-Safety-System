export default function AlertTable({ alerts, onSelect }) {
  return (
    <table className="alert-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Tourist</th>
          <th>Location</th>
          <th>Time</th>
          <th>Risk</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {alerts.map((a) => (
          <tr key={a.id}>
            <td className={`type ${a.type.toLowerCase()}`}>
              {a.type}
            </td>
            <td className="link">{a.touristName}</td>
            <td>📍 {a.location}</td>
            <td>{a.time}</td>
            <td>{a.risk}</td>
            <td>{a.status}</td>
            <td>
              <button onClick={() => onSelect(a)}>
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
