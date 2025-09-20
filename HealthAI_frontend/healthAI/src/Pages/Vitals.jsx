import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/vitals.css";

export default function Vitals() {
  const [vitals, setVitals] = useState({
    blood_pressure: "",
    heart_rate: "",
    temperature: "",
    oxygen_level: "",
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access"); // JWT token

  const handleChange = (e) => {
    setVitals({ ...vitals, [e.target.name]: e.target.value });
  };

  const fetchVitals = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/history/vitals/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/vitals/",
        { vitals_json: vitals },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Vitals recorded successfully!");
      setVitals({
        blood_pressure: "",
        heart_rate: "",
        temperature: "",
        oxygen_level: "",
      });
      fetchVitals(); // refresh history
    } catch (err) {
      console.error(err);
      alert("Error recording vitals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVitals();
  }, []);

  return (
    <div className="vitals-container">
      <h1>Record Your Vitals</h1>
      <form className="vitals-form" onSubmit={handleSubmit}>
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
          placeholder="Heart Rate"
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
          name="oxygen_level"
          placeholder="Oxygen Level (%)"
          value={vitals.oxygen_level}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Recording..." : "Record Vitals"}
        </button>
      </form>

      <h2>Vitals History</h2>
      <div className="vitals-history">
        {history.length === 0 ? (
          <p>No vitals recorded yet.</p>
        ) : (
          history.map((v, i) => (
            <div key={i} className="vitals-item">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(v.recorded_at).toLocaleString()}
              </p>
              <p>
                <strong>BP:</strong> {v.vitals_json.blood_pressure}
              </p>
              <p>
                <strong>HR:</strong> {v.vitals_json.heart_rate}
              </p>
              <p>
                <strong>Temp:</strong> {v.vitals_json.temperature}
              </p>
              <p>
                <strong>O₂:</strong> {v.vitals_json.oxygen_level}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
