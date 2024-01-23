import { CarRental, CreditCard, DocumentScanner } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

type ExpiryNotificationProps = {
  title: string;
  expiredCount: number;
  expiringNextMonthCount: number;
  type: "car" | "id" | "driver";
};

const Icons = {
  id: (
    <CreditCard
      sx={{
        fill: "#4361ee",
      }}
    />
  ),
  car: (
    <CarRental
      sx={{
        fill: "#4361ee",
      }}
    />
  ),
  driver: (
    <DocumentScanner
      sx={{
        fill: "#4361ee",
      }}
    />
  ),
};

const ExpiryNotification = ({
  title,
  expiredCount,
  expiringNextMonthCount,
  type,
}: ExpiryNotificationProps) => {
  return (
    <Box
    // sx={{
    //   boxShadow:
    //     "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
    //   borderRadius: "10px",
    //   padding: 2,
    // }}
    >
      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        sx={{
          mb: 1,
        }}
      >
        {Icons[type]}
        <Typography variant="body1" color={"#4361ee"}>
          {title}
        </Typography>
      </Stack>
      <Stack spacing={0.5} direction={"column"}>
        <NotificationElement type="Expired" count={expiredCount} />
        <NotificationElement type="In 30 Days" count={expiringNextMonthCount} />
      </Stack>
    </Box>
  );
};

type NotificationElementProps = {
  type: "Expired" | "In 30 Days";
  count: number;
};

const NotificationElement = ({ count, type }: NotificationElementProps) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Box
          sx={{
            width: 10,
            height: 10,
            backgroundColor: type === "Expired" ? "orangered" : "orange",
            marginRight: 5,
            borderRadius: "999px",
          }}
        ></Box>
        <Typography variant="body2" color="grey">
          {type}
        </Typography>
      </Stack>
      <Typography fontWeight={500}>{count}</Typography>
    </Stack>
  );
};

export default ExpiryNotification;
