import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "./utils/fetchapi";

function App() {
  const navigate = useNavigate();
  const [getName, setGetName] = useState("");

  const clientHandler = () => {
    fetchAPI("GET", "whoami", undefined, (res: AxiosResponse) => {
      if (!!res.data.data.message) {
        setGetName(res.data.data.message);
      }
    });
  };

  useEffect(() => {
    clientHandler();
  });

  const logOutHandler = () => {
    fetchAPI("POST", "logout", undefined, () => {
      navigate("/login");
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {getName ? (
        <h1 className="font-semibold text-4xl">Hi, {getName}</h1>
      ) : (
        <p className="text-3xl">
          Login First,{" "}
          <a href="/login" className="text-indigo-600 text-sm">
            login
          </a>
        </p>
      )}

      {!getName ? (
        ""
      ) : (
        <button
          className="mt-8 bg-gray-200 p-3 rounded hover:bg-gray-300 "
          onClick={logOutHandler}
        >
          Log Out
        </button>
      )}
    </div>
  );
}

export default App;
