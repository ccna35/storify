import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Container,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../env";
import { NavLink, useNavigate } from "react-router-dom";
import { Fragment, MouseEvent, useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import PersonAdd from "@mui/icons-material/PersonAdd";

const NAV_MENU_ITEMS = [
  {
    id: 1,
    name: "Home",
    path: "/",
  },
  {
    id: 2,
    name: "Profile",
    path: "/profile",
  },
  {
    id: 3,
    name: "Settings",
    path: "/settings",
  },
];

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <Box>
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Container maxWidth="lg" sx={{ marginInline: "auto" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LOGO
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              {user !== null && (
                <Stack direction="row" spacing={4} alignItems="center">
                  {NAV_MENU_ITEMS.map(({ id, name, path }) => {
                    return (
                      <Link
                        key={id}
                        component={NavLink}
                        to={path}
                        color="#fff"
                        sx={{
                          textDecoration: "none",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          "&.active": {
                            border: "1px solid white",
                          },
                        }}
                      >
                        {name}
                      </Link>
                    );
                  })}

                  <Fragment>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem onClick={handleClose}>
                        <Avatar /> Profile
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Avatar /> My account
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </Fragment>
                </Stack>
              )}
              {/* {user !== null && (
                <LoadingButton
                  variant="outlined"
                  color="inherit"
                  loading={status === "loading"}
                  onClick={handleLogout}
                >
                  Logout
                </LoadingButton>
              )} */}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
