export default function Header() {
  return (
    <div style={styles.header}>
      <h2>Official Departments</h2>
      <input placeholder="Search…" style={styles.search} />
    </div>
  );
}

const styles = {
  header: {
    height: "60px",
    background: "#ffffff",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
  },
  search: {
    padding: "6px",
    width: "260px",
  },
};
