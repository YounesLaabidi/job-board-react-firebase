import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const EmployerRoutes = () => {
  // const uid = sessionStorage.getItem("uid");
  // const users = localStorage.getItem("users");
  // const usersParsed = JSON.parse(users);
  // const user = usersParsed.some(
  //   (user) => user.uid === uid && user.account === "employer"
  // );
  // {
  //   return user ? <Outlet /> : <Navigate to="/dashboard" />;
  // }
  return <Outlet />;
};

const NotAuthenticated = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

const Authenticated = () => {
  const { currentUser } = useAuth();
  return !currentUser ? <Outlet /> : <Navigate to="/dashboard" />;
};

export { EmployerRoutes, NotAuthenticated, Authenticated };
