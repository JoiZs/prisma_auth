import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/loading";
import "./index.css";
import App from "./App"
import Register from "./components/register"
import Login from "./components/login"
import Reset from "./components/forgetpw"
import RestFrom from "./components/restfrom"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restpw" element={<Reset />} />
          <Route path="/restpw/:idTk" element={<RestFrom />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
