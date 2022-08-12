import React from "react";

const ComputeLayout = ({children}) => {
  return (
    <div className={`flex justify-center items-start w-full `}>
      <div className={`flex flex-row flex-wrap max-w-[1280px] w-full`}>
        <div
          className={`p-1 md:p-2 w-full h-auto`}
        >
          <div
            className={`w-full h-full shadow border rounded-lg bg-white p-1 md:p-5`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputeLayout;
