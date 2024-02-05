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
    width: "fit-content",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "white",
  },
});

type DropDownProps = {
  isDrawerOpen: boolean;
  item: {
    ModulesCategoryName: string;
    SystemModuleName: string;
  };
};

const DropDown = ({ isDrawerOpen, item }: DropDownProps) => {
  // Dropdown logic
  const [dropDownStatus, setDropDownStatus] = useState(false);

  const handleDropDownClick = () => {
    if (isDrawerOpen) setDropDownStatus(!dropDownStatus);
  };
  return (
    <>
      {!isDrawerOpen && (
        <CustomWidthTooltip
          title={
            <Stack spacing={1}>
              {item.SystemModuleName.split(", ").map((menuItem) => (
                <Box
                  key={menuItem}
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
                    to="/"
                    underline="none"
                    sx={{
                      color: "#262626",
                    }}
                  >
                    <Typography fontSize={14}>{menuItem}</Typography>
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
          <ListItemIcon sx={{ minWidth: 0, mr: isDrawerOpen ? 1 : "auto" }}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={item.ModulesCategoryName} />
          {dropDownStatus ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      )}
      {isDrawerOpen && (
        <Collapse in={dropDownStatus} timeout="auto" unmountOnExit>
          <List component="ul" disablePadding>
            {item.SystemModuleName.split(", ").map((menuItem) => (
              <ListItem
                key={menuItem}
                disablePadding
                sx={{ display: "block", position: "relative" }}
              >
                <Link
                  component={RouterLink}
                  to="/"
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
                      primary={menuItem}
                      sx={{
                        opacity: isDrawerOpen ? 1 : 0,
                        color: "grey",
                        "& span": {
                          fontSize: 14,
                        },
                      }}
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
