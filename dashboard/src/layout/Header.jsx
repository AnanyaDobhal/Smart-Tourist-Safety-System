export default function Header({ toggle }) {
  return (
    <header className="app-header">
      {/* LEFT */}
      <div className="header-left">
        <span className="menu-btn" onClick={toggle}>☰</span>
        <span className="logo">🌊 Tourist Safety System</span>
      </div>

      {/* CENTER */}
      <div className="header-center">
        <input
          type="text"
          placeholder="Search analyses, datasets..."
        />
      </div>

      {/* RIGHT */}
      <div className="header-right">
        <span>Help</span>
        <span>Docs</span>
        <span>Feedback</span>
      </div>
    </header>
  );
}
