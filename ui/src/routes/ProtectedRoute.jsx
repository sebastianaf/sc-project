import { Navigate } from "react-router-dom";
import { store } from "../stores/index";

const ProtectedRoute = ({ children }) => {
  const user = store.getState().user;
  return user ? children : <Navigate to={`/login`} />;
};

export default ProtectedRoute;
