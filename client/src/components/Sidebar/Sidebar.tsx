import {
  Box,
  Button,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import axios from "axios";
import { API_URL } from "../../env";
import { LoadingButton } from "@mui/lab";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import CircleIcon from "@mui/icons-material/Circle";
import SettingsIcon from "@mui/icons-material/Settings";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import {
  CircleTwoTone,
  DashboardCustomizeOutlined,
  DashboardCustomizeTwoTone,
} from "@mui/icons-material";

type MenuItemType = {
  id: number;
  name: string;
  path?: string;
  icon: JSX.Element;
  subMenu?: { id: number; name: string; path: string; icon: JSX.Element }[];
};

type SidebarMenuItemsType = MenuItemType[];

const SidebarMenuItems: SidebarMenuItemsType = [
  { id: 1, name: "Dashboard", path: "/", icon: <DashboardCustomizeOutlined /> },
  {
    id: 2,
    name: "Products",
    icon: <InventoryIcon />,
    subMenu: [
      {
        id: 3,
        name: "Product List",
        path: "/products",
        icon: (
          <CircleIcon
            sx={{
              fontSize: 10,
            }}
          />
        ),
      },
      {
        id: 4,
        name: "Add Product",
        path: "/new-product",
        icon: (
          <CircleIcon
            sx={{
              fontSize: 10,
            }}
          />
        ),
      },
    ],
  },
  // { id: 5, name: "Profile", path: "/profile", icon: <AccountCircleIcon /> },
  { id: 6, name: "Settings", path: "/settings", icon: <SettingsIcon /> },
];

type MenuItemProps = (typeof SidebarMenuItems)[number];

const MenuItem = ({ name, path, subMenu, icon }: MenuItemProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!subMenu) return;
    setOpen(!open);
  };

  const MenuItemButton = () => (
    <ListItemButton
      onClick={handleClick}
      sx={{
        borderRadius: 2,
      }}
    >
      <ListItemIcon>
        <DashboardCustomizeTwoTone />
      </ListItemIcon>
      <ListItemText
        primary={name}
        sx={{
          color: "grey",
        }}
      />
      {subMenu && (open ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  );

  return (
    <>
      {path ? (
        <Link
          component={NavLink}
          to={path}
          sx={{
            textDecoration: "none",
            color: "grey",
            "&.active .MuiButtonBase-root": {
              background: "#e9ecef",
              color: "#343a40",
              fontWeight: 500,
            },
            "&.active .MuiButtonBase-root .MuiListItemText-root": {
              color: "#343a40",
              fontWeight: 500,
            },
          }}
        >
          <MenuItemButton />
        </Link>
      ) : (
        <MenuItemButton />
      )}

      {subMenu && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {subMenu.map(({ id, name, path, icon }) => {
              return (
                <Link
                  key={id}
                  component={NavLink}
                  to={path}
                  sx={{
                    textDecoration: "none",
                    color: "grey",
                    "&.active .MuiButtonBase-root": {
                      background: "#e9ecef",
                      color: "#343a40",
                      fontWeight: 500,
                    },
                  }}
                >
                  <ListItemButton key={id} sx={{ borderRadius: 2, pl: 4 }}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </Link>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};

const Sidebar = () => {
  const { user, updateUserInfo } = useContext(UserContext);

  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleLogout = async () => {
    setStatus("loading");
    try {
      const res = await axios.get(API_URL + "users/logout");
      console.log(res);
      updateUserInfo(null);
      localStorage.removeItem("user");
      setStatus("idle");
      navigate("/login");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <Stack spacing={2}>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          // border: "1px solid lightgray",
          padding: "5px",
          boxShadow:
            "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
          borderRadius: "16px",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {SidebarMenuItems.map(({ id, name, path, subMenu }) => {
          return (
            <MenuItem
              key={id}
              id={id}
              name={name}
              path={path}
              subMenu={subMenu}
            />
          );
        })}
      </List>
      <LoadingButton
        loading={status === "loading"}
        loadingPosition="start"
        variant="contained"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{
          borderRadius: "16px",
        }}
      >
        Sign out
      </LoadingButton>
    </Stack>
  );
};

export default Sidebar;
