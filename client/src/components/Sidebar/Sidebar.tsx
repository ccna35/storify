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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

type MenuItemType = {
  id: number;
  name: string;
  path?: string;
  subMenu?: { id: number; name: string; path: string }[];
};

type SidebarMenuItemsType = MenuItemType[];

const SidebarMenuItems: SidebarMenuItemsType = [
  { id: 1, name: "Dashboard", path: "/" },
  {
    id: 2,
    name: "Products",
    subMenu: [
      { id: 3, name: "Product List", path: "/products" },
      { id: 4, name: "Add Product", path: "/new-product" },
    ],
  },
  { id: 5, name: "Profile", path: "/profile" },
  { id: 6, name: "Settings", path: "/settings" },
];

type MenuItemProps = (typeof SidebarMenuItems)[number];

const MenuItem = ({ name, path, subMenu }: MenuItemProps) => {
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
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary={name} />
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
            "&.active .MuiButtonBase-root": {
              background: "#e9ecef",
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
            {subMenu.map(({ id, name, path }) => {
              return (
                <Link
                  key={id}
                  component={NavLink}
                  to={path}
                  sx={{
                    textDecoration: "none",
                    "&.active .MuiButtonBase-root": {
                      background: "#e9ecef",
                    },
                  }}
                >
                  <ListItemButton key={id} sx={{ pl: 4, borderRadius: 2 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
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
          border: "1px solid lightgray",
          borderRadius: 2,
          padding: "5px",
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
      >
        Sign out
      </LoadingButton>
    </Stack>
  );
};

export default Sidebar;
