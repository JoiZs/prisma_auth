import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App"
import Register from "./components/register"
import Login from "./components/login"
import Reset from "./components/forgetpw"
import RestFrom from "./components/restfrom"

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restpw" element={<Reset />} />
          <Route path="/restpw/:idTk" element={<RestFrom />} />
        </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
