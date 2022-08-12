import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../styles/index.css";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import DropdownUser from "./DropdownUser";

//Redux
import { connect } from "react-redux";
import { setSidebar, setOpen } from "../actions";

const Header = (props) => {
  const { sidebar, setSidebar, setOpen } = props;
  return (
    <>
      <div
        className={`flex justify-between items-center p-2 bg-slate-200 h-[70px] border`}
      >
        <FontAwesomeIcon
          icon={faBars}
          className={`icon cursor-pointer mx-2 md:invisible`}
          onClick={() => {
            setSidebar(!sidebar);
            setOpen(true);
          }}
        />
        <Link className="cursor-pointer md:hidden" to="/compute1">
          <img className="max-h-[48px]" src={logo} alt="logo" />
        </Link>
        <DropdownUser />
      </div>
      <div className={`overflow-x-hidden overflow-y-auto`}></div>
    </>
  );
};

const mapState = (state) => ({
  sidebar: state.sidebar,
  user: state.user,
});

const mapActions = {
  setSidebar,
  setOpen
};

export default connect(mapState, mapActions)(Header);
