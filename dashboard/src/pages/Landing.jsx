import { useNavigate } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <div className="logo">SmartTourist.AI</div>

          <h1>
            Safety Reimagined.
          </h1>

          <h2>
            Next-Gen Tourist Monitoring & Rapid Response
          </h2>

          <p>
            Experience the future of travel safety with our AI-powered ecosystem. 
            Real-time tracking, intelligent threat detection, and instant emergency dispatch—all in one beautiful dashboard.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/login")}>
              Launch Console 🚀
            </button>

            <span
              className="link-btn"
              onClick={() => {
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              See How It Works ↓
            </span>
          </div>
        </div>

        <div className="hero-right" />
      </section>

      {/* FEATURES SECTION */}
      <section className="features" id="features">
        <h3>Power-Packed Modules</h3>

        <div className="feature-grid">
          <div className="card">
            <h4>Live Geo-Fencing</h4>
            <p>
              Set virtual safety perimeters. Receive instant alerts if tourists enter restricted or high-risk zones.
            </p>
          </div>

          <div className="card">
            <h4>Digital Identity</h4>
            <p>
              Seamless QR-based verification. Verify tourist identities in seconds without physical paperwork.
            </p>
          </div>

          <div className="card">
            <h4>Panic Response</h4>
            <p>
              One-tap SOS triggers immediate protocol activation, dispatching nearest units to the exact coordinates.
            </p>
          </div>

          <div className="card">
            <h4>Crowd Analytics</h4>
            <p>
              Predict overcrowding and potential stampedes using real-time density heatmaps and AI forecasting.
            </p>
          </div>

          <div className="card">
            <h4>Incidents Log</h4>
            <p>
              Comprehensive digital FIR system. Track case status from reporting to resolution with transparency.
            </p>
          </div>

          <div className="card">
            <h4>Authority Sync</h4>
            <p>
              Unified communication channel between Police, Medical Teams, and Tourism Board.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to make tourism safer and smarter?</h2>
        <button className="primary-btn" onClick={() => navigate("/login")}>
          Get Started Now
        </button>
      </section>

      {/* FOOTER */}
      <footer>
        <p>Built with ❤️ for the Future of Smart Governance</p>
        <p style={{ opacity: 0.5, marginTop: '10px' }}>© 2025 Smart Tourist Safety System</p>
      </footer>
    </div>
  );
}