import Sidebar from "../components/Sidebar";
import Header from "./Header";
import "../App.css"; // Global styles

export default function MainLayout({ children }) {
  return (
    <div className="app-container">
      {/* Sidebar (Always Open) */}
      <Sidebar />

      {/* Content Wrapper */}
      <div className="main-content-wrapper">
        <Header />
        
        {/* Main Content Area: Fills remaining height */}
        <main className="main-content-area">
          {children}
        </main>
      </div>
    </div>
  );
}