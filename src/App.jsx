import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AssessmentTest from "./pages/AssessmentTest";
import Onboarding from "./pages/Onboarding";
import LoadingResult from "./pages/LoadingResult";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <AssessmentTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loading-result"
          element={
            <ProtectedRoute>
              <LoadingResult />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
