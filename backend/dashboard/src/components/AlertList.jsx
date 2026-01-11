export default function AlertList({ alerts, onSelect }) {
  return (
    <div>
      {alerts.map(alert => (
        <div key={alert.id} onClick={() => onSelect(alert)}>
          {alert.type} – {alert.status}
        </div>
      ))}
    </div>
  );
}
