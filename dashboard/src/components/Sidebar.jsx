import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        SafeTour<span style={{color: 'white'}}>AI</span>
      </div>

      <div className="nav-links">
        <NavLink to="/dashboard" className="menu-item">
          <span className="icon">📊</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/map" className="menu-item">
          <span className="icon">🗺️</span>
          <span>Live Map</span>
        </NavLink>

        <NavLink to="/alerts" className="menu-item">
          <span className="icon">🚨</span>
          <span>Alerts & SOS</span>
        </NavLink>

        <NavLink to="/verify" className="menu-item">
          <span className="icon">🆔</span>
          <span>Verification</span>
        </NavLink>

        
      </div>
    </aside>
  );
}