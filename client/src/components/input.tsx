import React from "react";

interface Props {
  rtfType: React.MutableRefObject<HTMLInputElement | null>;
  inpType: string;
  extraCSS?: string;
  onChangeFn?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlurFn?: React.FocusEventHandler<HTMLInputElement> | undefined;
  error: { type: string | null; message: string | null };
}

const Input: React.FC<Props> = ({
  rtfType,
  inpType,
  onChangeFn,
  onBlurFn: onFocusFn,
  extraCSS,
  error,
}) => {
  return (
    <div className="flex flex-col mb-2">
      <label className="text-sm text-red-700">
        {error.type === inpType ? error.message : ""}
      </label>
      <input
        type={inpType}
        ref={rtfType}
        onChange={onChangeFn}
        onFocus={onFocusFn}
        onBlur={onFocusFn}
        className={`${extraCSS} ${
          error.type === inpType ? "bg-red-100" : ""
        } rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-transparent`}
        name={inpType}
        placeholder={inpType.replace(/\b(\w)/g, (s) => s.toUpperCase())}
      />
    </div>
  );
};

export default Input;
