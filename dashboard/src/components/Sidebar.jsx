import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        SafeTour<span style={{ color: 'var(--primary)' }}>AI</span>
      </div>

      <div className="nav-links">
        <NavLink to="/dashboard" className="menu-item">
          <span className="icon">📊</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/live-map" className="menu-item">
          <span className="icon">🗺️</span>
          <span>Live Map</span>
        </NavLink>

        <NavLink to="/alerts" className="menu-item">
          <span className="icon">🚨</span>
          <span>Alerts & SOS</span>
        </NavLink>

        <NavLink to="/verification" className="menu-item">
          <span className="icon">🆔</span>
          <span>Verification</span>
        </NavLink>
      </div>
    </aside>
  );
}