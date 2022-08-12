import React from "react";

//Redux
import { connect } from "react-redux";

const SidebarTitle = (props) => {
  const { data, open } = props;
  return (
    <li
      className={`${
        !open && `m-[-20px] opacity-0 scale-0`
      } font-bold select-none uppercase text-xs pb-2 duration-500`}
    >
      {data.title}
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    open: state.open,
  };
};

export default connect(mapStateToProps, null)(SidebarTitle);
