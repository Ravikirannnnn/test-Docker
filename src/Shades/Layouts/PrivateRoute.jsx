import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user_id = localStorage.getItem("user_id"); // Check if user is logged in

  return user_id ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
