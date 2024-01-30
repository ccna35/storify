import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { green, grey } from "@mui/material/colors";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

type NotificationCardProps = {
  title: string;
  time: string;
};

const NotificationCard = ({ title, time }: NotificationCardProps) => {
  return (
    <Box sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction={"row"} spacing={2}>
        <Avatar src="/broken-image.jpg" />
        <Stack spacing={2}>
          <Box>
            <Typography>{title}</Typography>
            <Typography color={grey[600]} variant="caption">
              {time}
            </Typography>
          </Box>
          <Stack direction={"row"} spacing={2}>
            <Button
              sx={{
                textTransform: "capitalize",
                px: 1.5,
                borderRadius: 3,
                backgroundColor: "#0085FF",
                "&:hover": {
                  backgroundColor: "#0085ffa6",
                },
              }}
              variant="contained"
            >
              Approve
            </Button>
            <Button
              color="error"
              sx={{ textTransform: "capitalize", px: 1.5, borderRadius: 3 }}
              variant="outlined"
            >
              Discard
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default function NotificationsPanel() {
  const [notificationsPanelState, setNotificationsPanelState] = useState(false);

  const openNotificationsPanel = () => {
    setNotificationsPanelState(true);
  };

  // Tabs state
  const [tabValue, setTabValue] = useState(0);

  // Tabs logic
  const handleTabs = (event: React.SyntheticEvent, index: number) => {
    setTabValue(index);
  };

  return (
    <>
      <IconButton
        color="info"
        aria-label="open notifications panel"
        onClick={openNotificationsPanel}
        sx={{ ml: "auto" }}
      >
        <Settings />
      </IconButton>
      <Drawer
        anchor={"right"}
        open={notificationsPanelState}
        onClose={() => setNotificationsPanelState(false)}
        slotProps={{ backdrop: { sx: { backgroundColor: "transparent" } } }}
        PaperProps={{
          sx: {
            backdropFilter: "blur(7px)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "rgba(145, 158, 171, 0.24) -40px 40px 80px -8px",
          },
        }}
      >
        <Box sx={{ width: 450 }} role="presentation">
          <Typography variant="h6" fontWeight={500} p={2}>
            Notifications
          </Typography>
          <Tabs
            value={tabValue}
            onChange={handleTabs}
            aria-label="basic tabs example"
            sx={{ borderBottom: "1px solid lightgrey", width: "100%" }}
          >
            <Tab
              value={0}
              label={
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography fontWeight={500} textTransform={"capitalize"}>
                    All
                  </Typography>
                  <Chip
                    label={20}
                    color="default"
                    variant="filled"
                    size="small"
                  />
                </Stack>
              }
              disableRipple
            />
            <Tab
              value={1}
              label={
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography fontWeight={500} textTransform={"capitalize"}>
                    Unread
                  </Typography>
                  <Chip label={20} color="info" variant="filled" size="small" />
                </Stack>
              }
              disableRipple
            />
            <Tab
              value={2}
              label={
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography fontWeight={500} textTransform={"capitalize"}>
                    Archived
                  </Typography>
                  <Chip
                    label={20}
                    color="warning"
                    variant="filled"
                    size="small"
                  />
                </Stack>
              }
              disableRipple
            />
          </Tabs>
          <CustomTabPanel value={tabValue} index={0}>
            <Stack
              divider={
                <Divider
                  sx={{ borderStyle: "dashed", borderColor: "lightgray" }}
                />
              }
            >
              <NotificationCard
                title="A change request needs your approval"
                time="28 minutes ago"
              />
              <NotificationCard
                title="5 employees joined the fleet"
                time="2 days ago"
              />
              <NotificationCard
                title="8 cards need fixing ASAP!"
                time="5 weeks ago"
              />
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </Drawer>
    </>
  );
}
