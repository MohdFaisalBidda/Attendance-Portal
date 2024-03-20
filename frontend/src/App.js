import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import { UserContext } from "./context/UserProvider";
import { useContext } from "react";
import PasswordReset from "./components/auth/PasswordReset.jsx";
import Home from "./components/Home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { getToken } from "./utils/localstorage.js";

function App() {
  const { user } = useContext(UserContext);
  const parsedUser = getToken();
  console.log(parsedUser, "parsed user");
  return (
    <Router>
      <Routes>
        {user == null && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<PasswordReset />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
        {user && (
          <>
            <Route
              path="/"
              element={
                parsedUser.username === "admin" ? (
                  <Dashboard />
                ) : (
                  <Home user={user} />
                )
              }
            />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="/reset" element={<Navigate to="/" />} />
            <Route
              path="/dashboard"
              element={
                parsedUser.username === "admin" && <Navigate to="/dashboard" />
              }
            />
          </>
        )}
        {user && parsedUser === "admin" && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
