import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.logo}>🌊 Tourist Safety</h3>

      <NavLink to="/dashboard" style={styles.link}>Dashboard</NavLink>
      <NavLink to="/map" style={styles.link}>Live Tourist Map</NavLink>
      <NavLink to="/alerts" style={styles.link}>Alerts & Incidents</NavLink>
      <NavLink to="/verify" style={styles.link}>Tourist ID Verification</NavLink>
      <NavLink to="/efir" style={styles.link}>E-FIR / Case Management</NavLink>
      <NavLink to="/settings" style={styles.link}>Settings</NavLink>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    height: "100vh",
    background: "#f4f6f8",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
  },
  link: {
    display: "block",
    padding: "10px",
    color: "#333",
    textDecoration: "none",
  },
};
