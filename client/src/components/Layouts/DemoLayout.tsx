import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Suspense, useMemo, useState } from "react";
import { UserProvider } from "../../hooks/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Button,
  Collapse,
  Link,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Tooltip,
  TooltipProps,
  tooltipClasses,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  Add,
  ExpandLess,
  ExpandMore,
  Settings,
  StarBorder,
} from "@mui/icons-material";
import BasicBreadcrumbs from "../Navbar/Breadcrumbs";
import SpinnerOfDoom from "../Spinners/SpinnerOfDoom";
import NotificationsPanel from "../Notifications/Notifications";
import DropDown from "./DropDown";
import { useMutation } from "@tanstack/react-query";
import { ProductService } from "../../api/products";
import { MissionsService } from "../../api/missions";
import { ErrorBoundary } from "react-error-boundary";

const drawerWidth = 240;

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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "white",
  borderBottom: "1px solid",
  borderBottomColor: "lightgray",
  width: `calc(100% - ${theme.spacing(7)} + 1px)`,
  //   zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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
  // Left Drawer logic
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Left Drawer logic
  const [dropDownsState, setDropDownsState] = useState(true);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDropDownsState(false);
    setIsDrawerOpen(false);
  };

  const navigate = useNavigate();

  const { mutateAsync: createMission } = useMutation({
    mutationFn: MissionsService.createMission,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <UserProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={isDrawerOpen} sx={{ boxShadow: "none" }}>
          <Toolbar sx={{ gap: 3 }}>
            {isDrawerOpen ? (
              <IconButton
                color="info"
                aria-label="open drawer"
                onClick={handleDrawerClose}
                edge="start"
                sx={{
                  marginRight: 5,
                  //   ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <IconButton
                color="info"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            )}

            <BasicBreadcrumbs />
            <NotificationsPanel enableAnimations />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                createMission();
              }}
            >
              New Mission
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={isDrawerOpen}>
          <DrawerHeader>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              {isDrawerOpen ? (
                <Box sx={{ width: "100%" }}>
                  <img src="./genilogo.png" alt="" style={{ width: "100%" }} />
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
          <List>
            {["Home", "Products"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <Link
                  component={RouterLink}
                  to={text === "Home" ? "/" : "/products"}
                  underline="none"
                  sx={{ color: "#262626" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: isDrawerOpen ? "initial" : "center",
                      px: 2.5,
                      "&:hover": {
                        backgroundColor: "#E6F4FF",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isDrawerOpen ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}

            <DropDown
              isDrawerOpen={isDrawerOpen}
              menuItems={["Home", "Products"]}
              dropDownsState={dropDownsState}
            />
          </List>
          <Divider />
          <List>
            {["Home", "Products"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <Link
                  component={RouterLink}
                  to={text === "Home" ? "/" : "/products"}
                  underline="none"
                  sx={{ color: "#262626" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: isDrawerOpen ? "initial" : "center",
                      px: 2.5,
                      "&:hover": {
                        backgroundColor: "#E6F4FF",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isDrawerOpen ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}

            <DropDown
              isDrawerOpen={isDrawerOpen}
              menuItems={["Home", "Products"]}
              dropDownsState={dropDownsState}
            />
          </List>
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
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <Outlet />
            </ErrorBoundary>
          </Suspense>
        </Box>
      </Box>
    </UserProvider>
  );
}
