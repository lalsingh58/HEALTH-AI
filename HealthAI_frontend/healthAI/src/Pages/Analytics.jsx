import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Analytics.css"; // You can reuse chat CSS
import { useNavigate } from "react-router-dom";

export default function Analytics() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access"); // JWT token

  const [vitals, setVitals] = useState({
    blood_pressure: "",
    heart_rate: "",
    temperature: "",
    oxygen_saturation: "",
  });

  const [response, setResponse] = useState(""); // AI analytics response
  const [loading, setLoading] = useState(false);

  // Redirect to login if no token
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  const handleChange = (e) => {
    setVitals({ ...vitals, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/analytics/",
        { vitals_json: vitals },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(res.data.analytics);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert(
          err.response?.data?.vitals_json ||
            "Error submitting vitals. Check console."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h1>Health Analytics</h1>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="blood_pressure"
          placeholder="Blood Pressure (e.g., 120/80)"
          value={vitals.blood_pressure}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="heart_rate"
          placeholder="Heart Rate (bpm)"
          value={vitals.heart_rate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.1"
          name="temperature"
          placeholder="Temperature (°F)"
          value={vitals.temperature}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="oxygen_saturation"
          placeholder="Oxygen Saturation (%)"
          value={vitals.oxygen_saturation}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Submit Vitals"}
        </button>
      </form>

      {response && (
        <div className="chat-box" style={{ marginTop: "1rem" }}>
          <div className="ai-response">{response}</div>
        </div>
      )}
    </div>
  );
}
