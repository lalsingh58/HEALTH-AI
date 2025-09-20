import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Chat from "./Pages/Chat";
import Navbar from "./Components/Navbar";
import DiseasePrediction from "./Pages/DiseasePrediction";
import Treatment from "./Pages/Treatment";
import Vitals from "./Pages/Vitals";
import Analytics from "./Pages/Analytics";

function App() {
  const token = localStorage.getItem("access"); // check login status

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/predict"
          element={
            token ? <DiseasePrediction /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/"
          element={token ? <Chat /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/treatment"
          element={token ? <Treatment /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/vitals"
          element={token ? <Vitals /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/analytics"
          element={token ? <Analytics /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
