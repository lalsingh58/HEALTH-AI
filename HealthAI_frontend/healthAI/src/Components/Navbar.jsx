import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access"); // ✅ correct key

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>HealthAI</h2>
      </div>
      <ul className="navbar-links">
        {token ? (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/predict">Disease Prediction</Link>
            </li>
            <li>
              <Link to="/treatment">Treatment Plan</Link>
            </li>
            <li>
              <Link to="/vitals">Vitals</Link>
            </li>
            <li>
              <Link to="/analytics">Health Analytics</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
