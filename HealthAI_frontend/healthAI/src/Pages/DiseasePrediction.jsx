import { useState } from "react";
import axios from "axios";
import "../styles/Disease.css";

export default function DiseasePrediction() {
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState("");
  const token = localStorage.getItem("access"); // JWT token

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/predict/",
        { symptoms },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error(err);
      alert("Error predicting disease");
    }
  };

  return (
    <div className="disease-container">
      <h1>Disease Prediction</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter your symptoms"
          required
        />
        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div className="prediction">Predicted Disease: {prediction}</div>
      )}
    </div>
  );
}
