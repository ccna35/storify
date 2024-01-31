import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
  Button,
  TooltipProps,
  tooltipClasses,
  Tooltip,
  styled,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { Add, ExpandLess, ExpandMore } from "@mui/icons-material";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    background: "white",
    color: "grey",
    boxShadow:
      "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
    borderRadius: "10px",
    width: 200,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "white",
  },
});

type DropDownProps = {
  isDrawerOpen: boolean;
  dropDownsState: boolean;
  menuItems: string[];
};

const DropDown = ({
  isDrawerOpen,
  menuItems,
  dropDownsState,
}: DropDownProps) => {
  // Dropdown logic
  const [dropDownStatus, setDropDownStatus] = useState(true);

  const handleDropDownClick = () => {
    if (isDrawerOpen) setDropDownStatus(!dropDownStatus);
  };
  return (
    <>
      {!isDrawerOpen && (
        <CustomWidthTooltip
          title={
            <Stack spacing={1}>
              {["Home", "Products"].map((text) => (
                <Box
                  key={text}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    position: "relative",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <Link
                    component={RouterLink}
                    to={text === "Home" ? "/" : "/products"}
                    underline="none"
                    sx={{
                      color: "#262626",
                    }}
                  >
                    <Typography>{text}</Typography>
                  </Link>
                  <Button
                    onClick={() => console.log("Hey!")}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: 0,
                      transform: "translateY(-50%)",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                      }}
                    >
                      <Add />
                    </ListItemIcon>
                  </Button>
                </Box>
              ))}
            </Stack>
          }
          placement="right"
          // leaveDelay={500000000}
          arrow
        >
          <ListItemButton sx={{ px: 2.5 }}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
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
      {isDrawerOpen && (
        <Collapse in={dropDownStatus} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {menuItems.map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: "block", position: "relative" }}
              >
                <Link
                  component={RouterLink}
                  to={text === "Home" ? "/" : "/products"}
                  underline="none"
                  sx={{ color: "#262626" }}
                >
                  <ListItemButton
                    sx={{
                      pl: 4,
                      pr: 2.5,
                      "&:hover": {
                        backgroundColor: "#E6F4FF",
                      },
                    }}
                  >
                    <ListItemText
                      primary={text}
                      sx={{ opacity: isDrawerOpen ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>

                <Button
                  onClick={() => console.log("Hey!")}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    transform: "translateY(-50%)",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                    }}
                  >
                    <Add />
                  </ListItemIcon>
                </Button>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};
export default DropDown;
