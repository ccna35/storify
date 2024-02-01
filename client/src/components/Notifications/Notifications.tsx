import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { Chip, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { LockClock, NotificationsTwoTone, Person } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../../api/dashboard";
import { motion, AnimatePresence } from "framer-motion";

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
  person: string;
  requestDate: string;
  description: string;
  requestNumber: string;
};

const NotificationCard = ({
  person,
  requestNumber,
  requestDate,
  description,
}: NotificationCardProps) => {
  return (
    <Box
      // component={motion.div}
      sx={{ p: 3, borderRadius: 3 }}
      // initial={{ opacity: 0, x: 80, scale: 0.3 }}
      // animate={{ opacity: 1, x: 0, scale: 1 }}
      // exit={{ opacity: 0, scale: 0.5, transition: { duration: 1 } }}
    >
      <Stack spacing={2}>
        {/* <Avatar src="/broken-image.jpg" /> */}
        <Stack direction={"row"} spacing={2}>
          <Chip
            label={person}
            color="info"
            variant="filled"
            size="small"
            icon={<Person />}
            sx={{
              backgroundColor: "#E3F1FF",
              color: "#1790FF",
              py: 1.5,
              px: 0.5,
            }}
          />
          <Chip
            label={"#" + requestNumber}
            color="secondary"
            variant="filled"
            size="small"
            sx={{
              backgroundColor: "#F3E5FF",
              color: "#9D4EDD",
              py: 1.5,
              px: 0.5,
            }}
          />
          <Chip
            label={requestDate}
            color="warning"
            variant="filled"
            size="small"
            sx={{
              backgroundColor: "#FFEEEE",
              color: "#FF6868",
              py: 1.5,
              px: 0.5,
            }}
            icon={<LockClock />}
          />
        </Stack>
        <Typography
          sx={{
            p: 2,
            backgroundColor: "#F3F3F3",
            color: "#777777",
            alignSelf: "flex-start",
            borderRadius: 5,
            borderTopLeftRadius: 0,
            fontSize: 14,
          }}
        >
          {description}
        </Typography>
        <Stack direction={"row"} spacing={2}>
          <Button
            sx={{
              textTransform: "capitalize",
              px: 1.5,
              borderRadius: 3,
              backgroundColor: "primary",
              color: "white",
              "&:hover": {
                backgroundColor: "#0085ffa6",
              },
            }}
            variant="contained"
          >
            Accept
          </Button>
          <Button
            sx={{
              textTransform: "capitalize",
              px: 1.5,
              borderRadius: 3,
              backgroundColor: "#FFF3F3",
              color: "#FF6868",
              "&:hover": {
                backgroundColor: "#FFE0E0",
              },
            }}
            variant="contained"
          >
            Discard
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

type NotificationsPanelProps = {
  enableAnimations?: boolean;
};

export default function NotificationsPanel({
  enableAnimations,
}: NotificationsPanelProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => DashboardService.getNotifications(),
    refetchInterval: 10 * 1000,
  });

  // Notifications Panel logic
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

  const notificationsCount =
    data &&
    Object.values(data).reduce((totalLength, value) => {
      if (Array.isArray(value)) {
        return totalLength + value.length;
      } else {
        return totalLength;
      }
    }, 0);

  return (
    <>
      <IconButton
        color="info"
        aria-label="open notifications panel"
        onClick={openNotificationsPanel}
        sx={{ ml: "auto", position: "relative" }}
      >
        <NotificationsTwoTone />
        <Box
          sx={{
            width: 20,
            height: 20,
            backgroundColor: "#FF5E5B",
            borderRadius: "50%",
            position: "absolute",
            top: 0,
            right: 0,
            display: "grid",
            placeItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 100,
              color: "white",
            }}
          >
            {data && notificationsCount}
          </Typography>
        </Box>
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
        <Box sx={{ width: 500 }} role="presentation">
          <Typography variant="h6" fontWeight={500} p={2}>
            Notifications
          </Typography>
          <Tabs
            value={tabValue}
            onChange={handleTabs}
            aria-label="basic tabs example"
            sx={{
              borderBottom: "1px solid lightgrey",
              width: "100%",
              position: "sticky",
              top: 0,
              backgroundColor: "rgb(255,255,255,.1)",
              zIndex: 999,
              backdropFilter: "blur(10px)",
            }}
          >
            <Tab
              value={0}
              label={
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography fontWeight={500} textTransform={"capitalize"}>
                    Materials
                  </Typography>
                  <Chip
                    label={data?.materialschangerequests.length}
                    color="default"
                    variant={tabValue === 0 ? "filled" : "outlined"}
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
                    Missions
                  </Typography>
                  <Chip
                    label={data?.missionschangerequests.length}
                    color="default"
                    variant={tabValue === 1 ? "filled" : "outlined"}
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
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : (
                data?.materialschangerequests.map((card) => (
                  <NotificationCard
                    key={card.idMaterialsRequest}
                    description={card.ChangeRequestDiscription}
                    requestDate={card.RequestDate}
                    person={card.ERPUserNickName}
                    requestNumber={card.MaterialsRequestNo}
                  />
                ))
              )}
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <Stack
              divider={
                <Divider
                  sx={{ borderStyle: "dashed", borderColor: "lightgray" }}
                />
              }
            >
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : data?.missionschangerequests.length === 0 ? (
                <Box sx={{ p: 3 }}>
                  <Typography
                    sx={{ p: 3, borderRadius: 5, backgroundColor: "#F3F3F3" }}
                  >
                    Nothing to see here!
                  </Typography>
                </Box>
              ) : (
                data?.missionschangerequests.map((card) => (
                  <NotificationCard
                    key={card.idMissions}
                    description={card.MissionsChangeRequestDiscription}
                    requestDate={card.RequestDate}
                    person={card.ERPUserNickName}
                    requestNumber={card.MissionNo}
                  />
                ))
              )}
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </Drawer>
    </>
  );
}
