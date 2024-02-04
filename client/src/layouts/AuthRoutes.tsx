import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SpinnerOfDoom from "../components/Spinners/SpinnerOfDoom";
import { useAppSelector } from "../app/hooks";
import { userSelector } from "../app/slices/authSlice";

const AuthRoutes = () => {
  const { UserName } = useAppSelector(userSelector);

  return UserName ? (
    <Navigate to="/" replace />
  ) : (
    <Suspense fallback={<SpinnerOfDoom />}>
      <Outlet />
    </Suspense>
  );
};

export default AuthRoutes;
