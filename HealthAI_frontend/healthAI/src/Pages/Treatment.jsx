import { useState } from "react";
import axios from "axios";
import "../styles/Treatment.css";

export default function Treatment() {
  const [condition, setCondition] = useState("");
  const [plan, setPlan] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/treatment/",
        { condition },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPlan(res.data.plan);
    } catch (err) {
      console.error(err);
      setPlan("Error fetching treatment plan.");
    }
  };

  return (
    <div className="treatment-container">
      <h1>Treatment Plan</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="Enter your condition"
          required
        />
        <button type="submit">Get Plan</button>
      </form>
      {plan && <div className="treatment-plan">{plan}</div>}
    </div>
  );
}
