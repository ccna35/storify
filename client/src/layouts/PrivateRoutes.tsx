import { Navigate, Outlet } from "react-router-dom";
import { resetAppError, userSelector } from "../app/slices/authSlice";
import { useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { useAppDispatch } from "../store/store";

const PrivateRoutes = () => {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(resetAppError());
  // }, []);

  const { UserName } = useAppSelector(userSelector);
  return UserName ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRoutes;
