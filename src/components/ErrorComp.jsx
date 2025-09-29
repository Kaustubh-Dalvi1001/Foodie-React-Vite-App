import { useRouteError } from "react-router-dom";

const ErrorComp = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops!!</h1>
      <b> Something Went Wrong: {error.data} </b>
    </div>
  );
};

export default ErrorComp;
