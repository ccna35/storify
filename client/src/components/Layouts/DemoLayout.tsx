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
import { Outlet } from "react-router-dom";
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
import NotificationsContainer from "../Pages/HomePage/Notifications/NotificationContainer";
import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../../api/dashboard";
import withHeadline from "../Pages/HomePage/withHeadline";
import SimpleDataGrid from "../Pages/HomePage/DataGrids/SimpleDataGrid";
import DemoBarChart from "../Pages/HomePage/Charts/DemoBarChart";
import DemoPieChart from "../Pages/HomePage/PieCharts/DemoPieChart";
import InsuranceContainer from "../Pages/HomePage/InsuranceContainer";
import StackedBarsContainer from "../Pages/HomePage/StackedBar/StackedBarsContainer";
import { GridColDef } from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
import {
  ExpandLess,
  ExpandMore,
  Settings,
  StarBorder,
} from "@mui/icons-material";
import BasicBreadcrumbs from "../Navbar/Breadcrumbs";
import SpinnerOfDoom from "../Spinners/SpinnerOfDoom";
import NotificationsPanel from "../Notifications/Notifications";

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

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDropDownStatus(false);
    setIsDrawerOpen(false);
  };

  // Notifications Panel logic
  const [notificationsPanelState, setNotificationsPanelState] = useState(false);

  const openNotificationsPanel = () => {
    setNotificationsPanelState(true);
  };

  const closeNotificationsPanel = () => {
    setNotificationsPanelState(false);
  };

  // Dropdown logic
  const [dropDownStatus, setDropDownStatus] = useState(true);

  const handleDropDownClick = () => {
    if (isDrawerOpen) setDropDownStatus(!dropDownStatus);
  };

  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      background: "white",
      color: "grey",
      boxShadow:
        "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
      borderRadius: "10px",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: "white",
    },
  });

  return (
    <UserProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={isDrawerOpen} sx={{ boxShadow: "none" }}>
          <Toolbar>
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
            {/* <IconButton
              color="info"
              aria-label="open notifications panel"
              onClick={handleDrawerOpen}
              sx={{ ml: "auto" }}
            >
              <Settings />
            </IconButton> */}
            <NotificationsPanel />
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
          {/* <Divider /> */}
          <List>
            {["Home", "Products"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <Link
                  component={RouterLink}
                  to={text === "Home" ? "/" : "/products"}
                  underline="none"
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: isDrawerOpen ? "initial" : "center",
                      px: 2.5,
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

            {!isDrawerOpen && (
              <CustomWidthTooltip
                title={
                  <Stack spacing={1}>
                    {["Home", "Products"].map((text, index) => (
                      <Link
                        key={text}
                        component={RouterLink}
                        to={text === "Home" ? "/" : "/products"}
                        underline="none"
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: 1,
                          color: "grey",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.04)",
                          },
                        }}
                      >
                        <Typography>{text}</Typography>
                      </Link>
                    ))}
                  </Stack>
                }
                placement="right"
                // leaveDelay={500000000}
                arrow
              >
                <ListItemButton onClick={handleDropDownClick} sx={{ px: 2.5 }}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                  {dropDownStatus ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </CustomWidthTooltip>
            )}
            {isDrawerOpen && (
              <ListItemButton onClick={handleDropDownClick} sx={{ px: 2.5 }}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {dropDownStatus ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            )}
            <Collapse in={dropDownStatus} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {["Home", "Products"].map((text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                    <Link
                      component={RouterLink}
                      to={text === "Home" ? "/" : "/products"}
                      underline="none"
                    >
                      <ListItemButton sx={{ pl: 4 }}>
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
              </List>
            </Collapse>
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <Link
                  component={RouterLink}
                  to={text === "Spam" ? "/spam" : "/"}
                  underline="none"
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: isDrawerOpen ? "initial" : "center",
                      px: 2.5,
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
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </UserProvider>
  );
}
