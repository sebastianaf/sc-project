import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const Button = (props) => {
  const { data, loading } = props;
  return (
    <Link
      to={data.to}
      className={`group relative w-full flex justify-center py-2 px-4 border
      border-transparent text-sm font-medium rounded-md text-white bg-cyan-600
      hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2
      focus:ring-cyan-500 duration-500`}
    >
      <Spinner loading={loading} />
      <span className={`${loading ? `hidden` : ``}`}>{data.title}</span>
    </Link>
  );
};

export default Button;
