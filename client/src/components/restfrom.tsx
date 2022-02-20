import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAPI } from "../utils/fetchapi";
import Input from "./input";
import Submitbtn from "./submitbtn";

interface Props {}

const Restfrom = (props: Props) => {
  const navigate = useNavigate();
  const { idTk } = useParams();
  const [submitLoading, setSubmitLoading] = useState<boolean>();
  const [retypePw, setRetypePw] = useState<boolean>(true);
  const [successRes, setSuccessRes] = useState<string>("");
  const [loginError, setLoginError] = useState({
    type: null,
    message: null,
  });

  const new_password: React.MutableRefObject<null | HTMLInputElement> =
    useRef(null);

  const restHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchAPI(
      "POST",
      "resetpassword",
      { new_password: new_password.current?.value, token_Id: idTk },
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
        <div className="p-6 w-full">
          <form
            action="POST"
            onSubmit={
              retypePw
                ? restHandler
                : (e) => {
                    e.preventDefault();
                  }
            }
          >
            <Input
              error={loginError}
              inpType="password"
              rtfType={new_password}
              onChangeFn={(e) => setRetypePw(false)}
              onBlurFn={() => {
                setLoginError({ type: null, message: null });
              }}
            />
            <Input
              error={loginError}
              inpType="password"
              rtfType={useRef(null)}
              onBlurFn={(e) => {
                setRetypePw(
                  new_password.current?.value === e.currentTarget.value
                );
                setLoginError({ type: null, message: null });
              }}
              extraCSS={retypePw ? "border-gray-300" : "border-red-600"}
            />
            <Submitbtn loading={submitLoading} submitType="Verify" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restfrom;
