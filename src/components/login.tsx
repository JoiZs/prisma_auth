import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./input";
import Submitbtn from "./submitbtn";
import { fetchAPI } from "../utils/fetchapi";

const Login = () => {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState<boolean>();
  const [loginError, setLoginError] = useState({
    type: null,
    message: null,
  });

  const email: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
  const password: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);

  const loginAPIHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAPI(
      "POST",
      "login",
      { email: email.current?.value, password: password.current?.value },
      (res) => {
        if (res.data.error) {
          setLoginError({
            type: res.data.error.type,
            message: res.data.error.message,
          });
        }
        if (!!res.data.data) {
          navigate("/");
        }
      },
      setLoginLoading
    );
  };

  return (
    <div className="h-screen w-screen justify-center items-center">
      <div className="flex flex-1 h-full items-center justify-center flex-col md:w-1/2 lg:w-1/3 m-auto">
        <h1 className="uppercase italic font-bold lg:text-6xl">Logo</h1>
        <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl">
          Login
        </div>
        <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
          Create a new account ?
          <Link
            to="/register"
            className="text-sm text-blue-500 underline hover:text-blue-700"
          >
            Sign up
          </Link>
        </span>
        <div className="p-6 w-full">
          <form action="POST" onSubmit={loginAPIHandler}>
            <Input
              onBlurFn={() => {
                setLoginError({ type: null, message: null });
              }}
              rtfType={email}
              error={loginError}
              inpType="email"
            />
            <Input
              onBlurFn={() => {
                setLoginError({ type: null, message: null });
              }}
              rtfType={password}
              error={loginError}
              inpType="password"
            />
            <Submitbtn loading={loginLoading} submitType="Login" />
          </form>
          <div className="flex justify-center ">
            <Link to={"/restpw"} className="cursor-pointer hover:text-red-500">
              Forget password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
