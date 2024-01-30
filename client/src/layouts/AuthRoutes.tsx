import { Suspense, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import SpinnerOfDoom from "../components/Spinners/SpinnerOfDoom";

const AuthRoutes = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <Navigate to="/" />
  ) : (
    <Suspense fallback={<SpinnerOfDoom />}>
      <Outlet />
    </Suspense>
  );
};

export default AuthRoutes;
