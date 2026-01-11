import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Smart Tourist Safety System</h1>
        <p className="subtitle">
          Authority Login Portal
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/dashboard");
          }}
        >
          <div className="input-group">
            <label>Email / Username</label>
            <input
              type="text"
              placeholder="Enter your email or username"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot">Forgot password?</span>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="footer-text">
          Secure access for authorized personnel only
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "fixed",        // 🔥 IMPORTANT
    top: 0,
    left: 0,
    width: "100vw",           // full width
    height: "100vh",          // full height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
    zIndex: 9999              // above everything
  },
  card: {
    width: "360px",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 0 15px rgba(0,0,0,0.15)",
    textAlign: "center",
    background: "#fff",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#1e90ff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: "10px"
  },
};
