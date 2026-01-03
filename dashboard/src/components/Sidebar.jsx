import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <NavLink to="/dashboard" className="menu-item">
        ⬛ Dashboard
      </NavLink>

      <NavLink to="/map" className="menu-item">
        🗺 Live Tourist Map
      </NavLink>

      <NavLink to="/alerts" className="menu-item">
        🚨 Alerts & Incidents
      </NavLink>

      <NavLink to="/verify" className="menu-item">
        🆔 Tourist ID Verification
      </NavLink>

      <NavLink to="/cases" className="menu-item">
        📂 E-FIR / Case Management
      </NavLink>

      <NavLink to="/settings" className="menu-item">
        ⚙ Settings
      </NavLink>
    </aside>
  );
}
