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
import { useMemo, useState } from "react";
import { UserProvider } from "../../hooks/UserContext";
import { Outlet } from "react-router-dom";
import { Collapse, Link, Stack } from "@mui/material";
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
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

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

const SimpleDataGridWithHeadline = withHeadline(
  SimpleDataGrid,
  "Pending Work Orders"
);

export default function DemoLayout() {
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "idWorkOrder",
        headerName: "idWorkOrder",
        width: 90,
        type: "number",
      },
      {
        field: "WorkOrderNo",
        headerName: "WorkOrderNo",
        width: 150,
        type: "string",
        renderCell: ({ value }) => {
          return (
            <Link component={RouterLink} to={`/workOrders/${value}`}>
              {value}
            </Link>
          );
        },
      },
      {
        field: "GovernoratesName",
        headerName: "GovernoratesName",
        width: 90,
        type: "string",
      },
      {
        field: "WorkOrderDate",
        headerName: "Creation Date",
        width: 90,
        type: "date",
        valueGetter: ({ value }) => value && new Date(value),
      },
      {
        field: "LastUpdateDate",
        headerName: "LastUpdateDate",
        width: 90,
        type: "date",
        valueGetter: ({ value }) => value && new Date(value),
      },
      {
        field: "ActionDate",
        headerName: "ActionDate",
        width: 90,
        type: "date",
        valueGetter: ({ value }) => value && new Date(value),
      },
      {
        field: "TeamLeadersName",
        headerName: "TeamLeadersName",
        width: 90,
        type: "string",
      },
      {
        field: "SiteType",
        headerName: "SiteType",
        width: 90,
        type: "string",
      },
      {
        field: "CompanyProjectsName",
        headerName: "CompanyProjectsName",
        width: 90,
        type: "string",
      },
      {
        field: "SubProjectsName",
        headerName: "SubProjectsName",
        width: 90,
        type: "string",
      },
      {
        field: "SiteName",
        headerName: "Site Name",
        width: 90,
        type: "string",
      },
      {
        field: "SiteCode",
        headerName: "Site Code",
        width: 90,
        type: "string",
      },
      {
        field: "ERPUserNickName",
        headerName: "Created By",
        width: 90,
        type: "string",
      },
      {
        field: "ActionID",
        headerName: "ActionID",
        width: 90,
        type: "number",
      },
      {
        field: "WorkOrderStatus",
        headerName: "WorkOrderStatus",
        width: 90,
        type: "string",
      },
    ],
    []
  );

  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [dropDownStatus, setDropDownStatus] = useState(true);

  const handleDropDownClick = () => {
    console.log("Clicked");

    setDropDownStatus(!dropDownStatus);
  };

  return (
    <UserProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ boxShadow: "none" }}>
          <Toolbar>
            {open ? (
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
                // edge="start"
                sx={
                  {
                    //   marginRight: 5,
                    //   ...(open && { display: "none" }),
                  }
                }
              >
                <MenuIcon />
              </IconButton>
            )}
            {/* <Typography variant="h6" noWrap component="div">
              Mini variant drawer
            </Typography> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              {open ? (
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
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItemButton onClick={handleDropDownClick} sx={{ px: 2.5 }}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
              {dropDownStatus ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={dropDownStatus} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, backgroundColor: "#FAFAFB" }}
        >
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </UserProvider>
  );
}
