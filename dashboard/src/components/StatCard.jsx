export default function StatCard({ title, value, subtitle }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <h2 style={styles.value}>{value}</h2>
      <p style={styles.subtitle}>{subtitle}</p>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "8px",
  },
  value: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#1e90ff",
  },
  subtitle: {
    fontSize: "13px",
    color: "#888",
    marginTop: "6px",
  },
};
