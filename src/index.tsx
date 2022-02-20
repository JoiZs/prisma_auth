import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/loading";
import "./index.css";

const App = React.lazy(() => import("./App"));
const Register = React.lazy(() => import("./components/register"));
const Login = React.lazy(() => import("./components/login"));
const Reset = React.lazy(() => import("./components/forgetpw"));
const RestFrom = React.lazy(() => import("./components/restfrom"));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="restpw" element={<Reset />} />
          <Route path="restpw/:idTk" element={<RestFrom />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
