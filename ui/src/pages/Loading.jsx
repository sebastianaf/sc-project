import React from "react";

import Spinner from "../components/Spinner";
import logo from "../assets/img/logo.png";
import { Transition } from "@headlessui/react";

const Loading = () => {
  return (
    <Transition
      show
      enter="transition ease-out duration-500"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-500"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="flex flex-col justify-center items-center h-screen bg-slate-100">
        <div>
          <img className="max-h-[64px] mb-2" src={logo} alt="logo" />
        </div>
        <div className="flex justify-center items-center">
          <Spinner loading />
        </div>
      </div>
    </Transition>
  );
};

export default Loading;
