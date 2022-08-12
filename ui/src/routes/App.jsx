import React, { useEffect, Suspense } from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import check from "../tools/check";

//Redux
import { connect } from "react-redux";
import { setUser } from "../actions";

const Login = React.lazy(() => import("../pages/Login"));
const Queue = React.lazy(() => import("../pages/Queue"));
const Cars = React.lazy(() => import("../pages/Cars"));
const Page404 = React.lazy(() => import("../pages/Page404"));
const Loading = React.lazy(() => import("../pages/Loading"));

const App = (props) => {
  const { setUser } = props;

  useEffect(() => {
    const checking = async () => {
      const user = await check();
      setUser(user);
    };
    checking();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Suspense
        fallback={<Loading/>}
      >
        <Routes>
          <Route exact path={`/login`} element={<Login />} />
          <Route exact path={`/queue`} element={<Queue />} />
          <Route exact path={`/cars`} element={<Cars />} />

          {/* Route corrections */}
          <Route exact path={`/`} element={<Navigate to={`/queue`} />} />
          <Route path={`*`} element={<Page404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapProps = {
  setUser,
};

export default connect(mapState, mapProps)(App);
