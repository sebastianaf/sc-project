import React from "react";
import Spinner from "./Spinner";

const ActionButton = (props) => {
  const { data, loading, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`group relative w-full flex justify-center py-2 px-4 border
      border-transparent text-sm font-medium rounded-md text-white bg-cyan-600
      hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2
      focus:ring-cyan-500 duration-500 cursor-pointer`}
    >
      <Spinner loading={loading} />
      <span className={`${loading ? `hidden` : ``} duration-500 text-base`}>{data.title}</span>
    </div>
  );
};

export default ActionButton;
