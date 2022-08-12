import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

//Redux
import { connect } from "react-redux";
import { setSidebar } from "../actions";

const DefaultLayout = (props) => {
  const { children, sidebar, setSidebar } = props;
  return (
    <div>
      <div
        className={`${
          !sidebar && `opacity-0 z-[-10]`
        } bg-slate-900 bg-opacity-60 fixed top-0 left-0 z-10 h-screen w-screen duration-500`}
        onClick={() => {
          setSidebar(!sidebar);
        }}
      ></div>
      <div
        className={`${
          !sidebar && `translate-x-[-270px]`
        } fixed top-0 left-0 z-20 h-screen duration-500`}
      >
        <Sidebar />
      </div>
      <div className={`flex flex-row`}>
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div
          className={`flex flex-col bg-white w-full min-h-screen max-h-screen`}
        >
          <Header />
          <div
            className={`flex justify-center flex-grow items-start overflow-x-hidden overflow-y-auto p-1 md:p-5 bg-slate-100`}
          >
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  sidebar: state.sidebar,
  user: state.user,
});

const mapActions = {
  setSidebar,
};

export default connect(mapState, mapActions)(DefaultLayout);
