import { userSelector } from "../../app/slices/authSlice";
import { useAppSelector } from "../../app/hooks";
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import DropDown from "./DropDown";
import { Link as RouterLink } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";

type SidebarMenuProps = {
  isDrawerOpen: boolean;
};

const SidebarMenu = ({ isDrawerOpen }: SidebarMenuProps) => {
  const { UserPriv } = useAppSelector(userSelector);

  return (
    <List>
      <ListItem disablePadding sx={{ display: "block" }}>
        <Link
          component={RouterLink}
          to="/"
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
                mr: isDrawerOpen ? 1 : "auto",
                justifyContent: "center",
              }}
            >
              <Dashboard />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              sx={{ opacity: isDrawerOpen ? 1 : 0 }}
            />
          </ListItemButton>
        </Link>
      </ListItem>
      {UserPriv.map((item) => (
        <ListItem
          key={item.ModulesCategoryName}
          disablePadding
          sx={{ display: "block" }}
        >
          {item.SystemModuleName.split(", ").length === 0 ? (
            <Link
              component={RouterLink}
              to="/"
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
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary={item.ModulesCategoryName}
                  sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          ) : (
            <DropDown isDrawerOpen={isDrawerOpen} item={item} />
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarMenu;
