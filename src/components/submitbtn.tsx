import React from "react";
import { BeatLoader } from "react-spinners";

const Submitbtn = (props: {
  loading: boolean | undefined;
  submitType: string;
}) => {
  return (
    <div className="flex w-full my-4">
      <button
        type="submit"
        className="py-2 px-4  bg-teal-600 hover:bg-teal-700 focus:ring-teal-500 focus:ring-offset-teal-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
      >
        {props.loading ? (
          <BeatLoader size={10} color="white" />
        ) : (
          props.submitType
        )}
      </button>
    </div>
  );
};

export default Submitbtn;
