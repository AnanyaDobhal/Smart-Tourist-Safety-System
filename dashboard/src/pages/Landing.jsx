import { useNavigate } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <div className="logo">Team Name</div>

          <h1>
            Smart Tourist Safety System:
          </h1>

          <h2>
            AI-Powered Tourist Safety, Monitoring & Emergency Response
          </h2>

          <p>
            Ensuring tourist safety through real-time monitoring, intelligent alerts,
            and rapid incident response using modern web and mapping technologies.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/login")}>
              GO TO CONSOLE ≋
            </button>

            <span
              className="link-btn"
              onClick={() => {
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Core Features →
            </span>
          </div>
        </div>

        <div className="hero-right" />
      </section>

      {/* FEATURES SECTION */}
      <section className="features" id="features">
        <h3>Integrated Intelligence</h3>

        <div className="feature-grid">
          <div className="card">
            <h4>Real-time location tracking</h4>
            <p>
              Track tourist locations and incidents on an interactive
              OpenStreetMap interface.
            </p>
          </div>

          <div className="card">
            <h4>Instant Alert System</h4>
            <p>
              Receive and manage SOS alerts, emergency signals,
              and suspicious activity reports instantly.
            </p>
          </div>

          <div className="card">
            <h4>Digital Tourist Identity</h4>
            <p>
              Generate and manage secure digital tourist IDs
              for quick verification during emergencies.
            </p>
          </div>

          <div className="card">
            <h4>Secure & Reliable</h4>
            <p>
              Role-based access, authentication,
              and protected data handling.
            </p>
          </div>

          <div className="card">
            <h4>Authority Dashboard</h4>
            <p>
              Dedicated dashboards for Police Department,
              Tourism Department, and Emergency Response Teams.
            </p>
          </div>

          <div className="card">
            <h4>Analytics & Reports</h4>
            <p>
              View system insights like active tourists,
              incident trends, and response time analysis.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Empower Your Research with Predictive Insights</h2>

        <button className="primary-btn" onClick={() => navigate("/login")}>
          🚀 Get Started
        </button>
      </section>

      {/* FOOTER */}
      <footer>
        Built for Hackathon / Smart Governance Initiative <br />
        © 2025 Smart Tourist Safety System
      </footer>
    </div>
  );
}
