import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

//Redux
import { connect } from "react-redux";

const SidebarItem = (props) => {
  const { data, open } = props;
  const location = useLocation();
  return (
    <Link to={data.to}>
      <li
        className={`${open ? `justify-start` : `justify-center`} ${
          location.pathname.startsWith(data.to) ? `bg-cyan-500` : `bg-slate-600`
        } flex items-center px-2 py-3 my-2 hover:bg-cyan-400 cursor-pointer duration-500 rounded-md`}
      >
        <FontAwesomeIcon className={`text-slate-200 mx-2`} icon={data.icon} />
        <div
          className={`${
            !open && `hidden`
          } overflow-hidden select-none duration-500 font-extralight`}
        >
          {data.title}
        </div>
      </li>
    </Link>
  );
};

const mapStateToProps = (state) => {
  return {
    open: state.open,
  };
};

export default connect(mapStateToProps,null)(SidebarItem);
