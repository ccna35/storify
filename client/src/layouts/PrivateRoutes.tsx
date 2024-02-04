import { Navigate, Outlet } from "react-router-dom";
import { userSelector } from "../app/slices/authSlice";
import { useAppSelector } from "../app/hooks";

const PrivateRoutes = () => {
  const { UserName } = useAppSelector(userSelector);
  return UserName ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRoutes;
