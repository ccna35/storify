import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { Suspense, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Backdrop,
  Button,
  Container,
  Fade,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import SpinnerOfDoom from "../Spinners/SpinnerOfDoom";
import { useAppDispatch } from "../../store/store";
import { clearUser } from "../../app/slices/authSlice";
import { useIdleTimer } from "react-idle-timer";
import SidebarMenu from "./SidebarMenu";
import Navbar from "./Navbar";
import { Warning } from "@mui/icons-material";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow:
    "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
  borderRadius: "10px",
  p: 3,
};

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

const FallBack = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Stack spacing={2} py={10} alignItems={"center"}>
      <Typography variant="h4">Something bad happened!</Typography>
      <Button onClick={resetErrorBoundary} variant="contained">
        Try Again
      </Button>
    </Stack>
  );
};

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
        handleOpenLogoutModal();
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
    handleCloseLogoutModal();
    // clear redux state and localStorage and redirect user to login page
    dispatch(clearUser());
    localStorage.clear();
    navigate("/login");
  };

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

  const [logoutModalState, setLogoutModalState] = useState(false);
  const handleOpenLogoutModal = () => setLogoutModalState(true);
  const handleCloseLogoutModal = () => setLogoutModalState(false);

  return (
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
          minHeight: "100vh",
        }}
      >
        <DrawerHeader />

        <Suspense fallback={<SpinnerOfDoom />}>
          <Container maxWidth="lg">
            <ErrorBoundary
              FallbackComponent={FallBack}
              onError={(error, info) => {
                console.log(error);
                console.log(info);
              }}
            >
              <Outlet />
            </ErrorBoundary>
          </Container>
        </Suspense>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={logoutModalState}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={logoutModalState}>
          <Stack sx={style} spacing={3}>
            <Stack direction={"row"} spacing={2}>
              <Warning color="warning" sx={{ alignSelf: "center" }} />
              <Typography id="transition-modal-description">
                Your session has expired, you're gonna have to log in again!
              </Typography>
            </Stack>
            <Button
              onClick={handleLogOut}
              variant="contained"
              color="warning"
              sx={{ alignSelf: "center", px: 4, fontSize: 16 }}
            >
              OK
            </Button>
          </Stack>
        </Fade>
      </Modal>
    </Box>
  );
}
