import React from "react";

//Redux
import { connect } from "react-redux";

const Footer = (props) => {
  const { app } = props;
  return (
    <div
      className={`w-full h-{50px} slate-100 flex justify-between border bg-slate-200 p-1`}
    >
      <div className={`relative left-0 font-extralight select-none ml-1`}>
        {app.name}
      </div>
      <div className={`relative right-0 font-extralight select-none mr-1`}>
        versión {app.version}
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    app: state.app,
  };
};

export default connect(mapState, null)(Footer);
