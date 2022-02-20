import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchAPI } from "../utils/fetchapi";
import Input from "./input";
import Submitbtn from "./submitbtn";

interface Props {}

const Register = (props: Props) => {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState<boolean>();
  const [retypePw, setRetypePw] = useState<boolean>(true);
  const [successRes, setSuccessRes] = useState<string>("");
  const [loginError, setLoginError] = useState({
    type: null,
    message: null,
  });

  const firstname: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);
  const lastname: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);
  const email: React.MutableRefObject<null | HTMLInputElement> = useRef(null);
  const password: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);

  const registerAPIHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchAPI(
      "POST",
      "register",
      {
        firstname: firstname.current?.value,
        lastname: lastname.current?.value,
        email: email.current?.value,
        password: password.current?.value,
      },
      (res) => {
        if (res.data.error) {
          setLoginError({
            type: res.data.error.type,
            message: res.data.error.message,
          });
        }
        if (!!res.data.data) {
          setSuccessRes(res.data.data.message);
          setTimeout(() => navigate("/login"), 3000);
        }
      },
      setSubmitLoading
    );
  };

  return (
    <div className="h-screen w-screen justify-center items-center">
      <div className="flex flex-1 h-full items-center justify-center flex-col md:w-1/2 lg:w-1/3 m-auto">
        <h1
          className={`bg-teal-100 ${
            successRes ? "p-4" : ""
          } text-teal-700 w-full`}
        >
          {successRes}
        </h1>
        <h1 className="uppercase italic font-bold lg:text-6xl">Logo</h1>
        <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl">
          Create a new account
        </div>
        <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
          Already have an account ?
          <Link
            to="/login"
            className="text-sm text-blue-500 underline hover:text-blue-700"
          >
            Sign in
          </Link>
        </span>
        <div className="p-6 w-full">
          <form
            action="POST"
            onSubmit={
              retypePw
                ? registerAPIHandler
                : (e) => {
                    e.preventDefault();
                  }
            }
          >
            <div className="flex justify-between mb-2">
              <Input
                onBlurFn={() => {
                  setLoginError({ type: null, message: null });
                }}
                error={loginError}
                rtfType={firstname}
                inpType="firstname"
              />
              <Input
                onBlurFn={() => {
                  setLoginError({ type: null, message: null });
                }}
                error={loginError}
                rtfType={lastname}
                inpType="lastname"
              />
            </div>
            <Input
              onBlurFn={() => {
                setLoginError({ type: null, message: null });
              }}
              error={loginError}
              rtfType={email}
              inpType="email"
            />
            <Input
              onBlurFn={() => {
                setLoginError({ type: null, message: null });
              }}
              error={loginError}
              onChangeFn={(e) => setRetypePw(false)}
              rtfType={password}
              inpType="password"
            />

            <Input
              error={loginError}
              inpType="password"
              rtfType={useRef(null)}
              onBlurFn={(e) => {
                setLoginError({ type: null, message: null });
                setRetypePw(password.current?.value === e.currentTarget.value);
              }}
              extraCSS={retypePw ? "border-gray-300" : "border-red-600"}
            />
            <Submitbtn loading={submitLoading} submitType="Sign Up" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
