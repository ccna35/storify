import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { Suspense, useEffect, useState } from "react";
import { UserProvider } from "../../hooks/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Stack } from "@mui/material";
import SpinnerOfDoom from "../Spinners/SpinnerOfDoom";
import { useAppDispatch } from "../../store/store";
import { clearUser } from "../../app/slices/authSlice";
import { useIdleTimer } from "react-idle-timer";
import SidebarMenu from "./SidebarMenu";
import Navbar from "./Navbar";

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DemoLayout() {
  // Checking user activity state
  const [state, setState] = useState<"Active" | "Idle">("Active");

  const onIdle = () => {
    setState("Idle");
  };

  const onActive = () => {
    setState("Active");
  };

  const onAction = () => {
    //update local storage with new time
    const lastAction = localStorage.getItem("lastAction");
    const currentTime = Date.now();

    if (lastAction !== null) {
      const idleTime = currentTime - parseInt(lastAction);

      if (idleTime > timeout) {
        handleLogOut();
      } else {
        updateLastAction(currentTime);
      }
    } else {
      updateLastAction(currentTime);
    }

    function updateLastAction(time: number) {
      localStorage.setItem("lastAction", JSON.stringify(time));
    }
  };

  // Session duration => 3 Hours, if user is idle for 4 hours he will be redirected to the login page
  const timeout = 3 * 60 * 60 * 1000;
  // const timeout = 10_000; // 10 seconds session

  useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout,
    throttle: 1000,
  });

  const handleLogOut = () => {
    // clear redux state and localStorage and redirect user to login page
    dispatch(clearUser());
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    if (state === "Idle") {
      handleLogOut();
    }
  }, [state]);

  // Left Drawer logic
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <UserProvider>
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <Navbar
          drawerWidth={drawerWidth}
          isDrawerOpen={isDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
          handleLogOut={handleLogOut}
        />
        <Drawer variant="permanent" open={isDrawerOpen}>
          <DrawerHeader
            sx={{
              justifyContent: isDrawerOpen ? "flex-start" : "center",
              pl: isDrawerOpen ? "20px" : "8px",
            }}
          >
            <Stack direction={"row"} spacing={1}>
              {isDrawerOpen ? (
                <Box sx={{ width: "100%" }}>
                  <img
                    src="./genilogo.png"
                    alt=""
                    style={{ width: "100%", maxWidth: "200px" }}
                  />
                </Box>
              ) : (
                <Box sx={{ width: "40px" }}>
                  <img
                    src="./geniprocess-icon.png"
                    alt=""
                    style={{ width: "100%" }}
                  />
                </Box>
              )}
            </Stack>
          </DrawerHeader>
          <SidebarMenu isDrawerOpen={isDrawerOpen} />
        </Drawer>
        <Box
          component="main"
          sx={{
            width: "100%",
            flexGrow: 1,
            p: 3,
            backgroundColor: "#FAFAFB",
          }}
        >
          <DrawerHeader />
          <Suspense fallback={<SpinnerOfDoom />}>
            <Container maxWidth="lg">
              <Outlet />
            </Container>
          </Suspense>
        </Box>
      </Box>
    </UserProvider>
  );
}
