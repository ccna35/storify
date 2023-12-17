import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { UserProvider } from "../hooks/UserContext";

const RootLayout = () => {
  return (
    <UserProvider>
      <Navbar />
      <Outlet />
    </UserProvider>
  );
};

export default RootLayout;
