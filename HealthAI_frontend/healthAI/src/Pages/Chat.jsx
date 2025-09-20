import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Chat.css";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access");

  // Redirect to login if not logged in
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      fetchHistory();
    }
  }, []);

  // Fetch previous queries
  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/history/queries/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch chat history.");
    }
  };

  // Send new query
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/chat/",
        { query },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setHistory([res.data, ...history]);
      setQuery("");
    } catch (err) {
      console.error(err);
      alert("Error sending query. Please login again.");
    }
  };

  return (
    <div className="chat-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question..."
        />
        <button type="submit">Send</button>
      </form>

      <div className="chat-history">
        {history.map((q) => (
          <div key={q.id} className="chat-item">
            <p>
              <b>You:</b> {q.query}
            </p>
            <p>
              <b>AI:</b> {q.response}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
