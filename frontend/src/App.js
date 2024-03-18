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

function App() {
  const { user } = useContext(UserContext);

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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            <Route path="/reset" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
