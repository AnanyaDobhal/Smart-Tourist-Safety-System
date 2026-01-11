export default function Timeline({ timeline }) {
  return (
    <div className="timeline">
      <h4>Incident Timeline</h4>
      <ul>
        {timeline.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
