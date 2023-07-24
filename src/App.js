import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
import Register from "./Components/Register/Register";
import FirstScreen from "./Components/FirstScreen/FirstScreen";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/">
        <Route index element={<FirstScreen />} />
        {token ? (
          <>
            <Route path="/Main" element={<Main />} />
            <Route path="/" element={<Navigate to="/Main" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

export default App;
