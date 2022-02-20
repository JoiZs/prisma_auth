import DotLoader from "react-spinners/DotLoader";

interface Props {}

const Loading = (props: Props) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <DotLoader size={150} />
    </div>
  );
};

export default Loading;
