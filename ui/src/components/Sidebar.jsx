import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCarSide,
  faLayerGroup
} from "@fortawesome/free-solid-svg-icons";


import SidebarTitle from "../components/SidebarTitle";
import SidebarItem from "../components/SidebarItem";
import logo from "../assets/img/logo.png";

//Redux
import { connect } from "react-redux";
import { setOpen } from "../actions";

import "../styles/index.css";

const Sidebar = (props) => {
  const { open, setOpen, app } = props;
  return (
    <div
      className={`${
        open ? `w-[270px]` : `w-[70px]`
      } md:flex flex-col flex-none z-10 bg-slate-700 h-screen transition-[width] duration-500`}
    >
      <div
        className={`p-4 bg-slate-900 h-auto duration-500 cursor-pointer select-none`}
      >
        <div className={`flex flex-col items-center justify-center`}>
          <img src={logo} alt={`logo`} className={`max-h-[100px]`} />
          <div
            className={`${
              !open && `m-[-15px] opacity-0 scale-0`
            } text-slate-100 font-bold text-xl whitespace-nowrap duration-500`}
          >
            {app.name}
          </div>
        </div>
      </div>
      <div
        className={`grow p-2 bg-slate-700 text-slate-100 overflow-x-hidden overflow-y-auto`}
      >
        <ul className={`py-4 px-1`}>
          <SidebarTitle data={{ title: `Modelos` }} />
          <SidebarItem
            data={{
              title: `Cola de servicios`,
              icon: faLayerGroup,
              to: `/queue`,
            }}
          />
          <SidebarItem
            data={{ title: `Vehículos`, icon: faCarSide, to: `/cars` }}
          />
        </ul>
      </div>
      <div
        className={`cursor-pointer hidden justify-end md:flex  items-center bg-slate-900 hover:bg-slate-800 duration-500 min-h-[50px]`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          className={`icon
            ${
              !open && `rotate-180`
            } mx-auto hover:text-slate-400 text-slate-100 duration-500`}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    app: state.app,
    open: state.open,
  };
};

const mapDispatchToProps = {
  setOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
