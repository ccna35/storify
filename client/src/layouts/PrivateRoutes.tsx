import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return <>{children}</>;
};

export default PrivateRoutes;
