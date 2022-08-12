import React from "react";
import Button from "../components/Button";

const Page404 = () => (
  <div className={`flex flex-col justify-end md:justify-center items-center min-h-screen`}>
    <div
      className={`flex justify-start items-center max-h-fit max-w-fit bg-slate-200 p-6 border rounded-lg shadow-md m-6`}
    >
      <h1 className={`font-light md:text-8xl mx-2 text-6xl text-cyan-600 align-middle`}>
        404
      </h1>
      <div className={`flex flex-col justify-start mx-4`}>
        <div className={`font-bold text-xl `}>
          Hay un error
        </div>
        <div className={`font-light my-4 text-slate-600`}>
          Esta página no se encuentra disponible
        </div>
        <Button data={{ title: `Regresar`, to: `/queue` }} />
      </div>
    </div>
  </div>
);

export default Page404;
