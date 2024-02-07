import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BasicBreadcrumbs from "../Navbar/Breadcrumbs";
import NotificationsPanel from "../Notifications/Notifications";
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { MissionsService } from "../../api/missions";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

type NavbarProps = {
  drawerWidth: number;
  isDrawerOpen: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  handleLogOut: () => void;
};

const Navbar = ({
  drawerWidth,
  handleDrawerClose,
  handleDrawerOpen,
  isDrawerOpen,
  handleLogOut,
}: NavbarProps) => {
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

  const { mutateAsync: createMission } = useMutation({
    mutationFn: MissionsService.createMission,
    // onSuccess: () => {
    //   showSuccessMessage();
    //   queryClient.invalidateQueries({ queryKey: ["products"] });
    // },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
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
          onClick={() => createMission()}
        >
          New Mission
        </Button>
        <Button variant="contained" color="error" onClick={handleLogOut}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
