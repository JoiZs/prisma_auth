import React, { useRef, useState } from "react";
import { fetchAPI } from "../utils/fetchapi";
import Input from "./input";
import Submitbtn from "./submitbtn";

interface Props {}

const Forgetpw = (props: Props) => {
  const [submitLoading, setSubmitLoading] = useState<boolean>();
  const [resMail, setResMail] = useState<string>();
  const [successRes, setSuccessRes] = useState<string>("");
  const [loginError, setLoginError] = useState({
    type: null,
    message: null,
  });
  const email: React.MutableRefObject<null | HTMLInputElement> = useRef(null);

  const forgetPwHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchAPI(
      "POST",
      "forgetpassword",
      { email: email.current?.value },
      (res) => {
        if (res.data.error) {
          setLoginError({
            type: res.data.error.type,
            message: res.data.error.message,
          });
        }
        if (!!res.data.data) {
          setSuccessRes(res.data.data.message);
          setTimeout(() => setResMail(res.data.data.extra), 3000);
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
          <form action="POST" onSubmit={forgetPwHandler}>
            <Input
              onBlurFn={() => {
                setLoginError({ type: null, message: null });
              }}
              error={loginError}
              inpType="email"
              rtfType={email}
            />
            <Submitbtn loading={submitLoading} submitType="Search by mail" />
          </form>
        </div>
        {resMail ? (
          <div className="bg-teal-200 p-2 bg-opacity-30">
            <p>Send Mail in test purpose Only(Not Deliver in realtime)</p>
            <a className="text-indigo-600 cursor-pointer" href={resMail}>
              Click Mail_Link
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Forgetpw;
