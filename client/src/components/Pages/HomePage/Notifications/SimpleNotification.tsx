import DescriptionIcon from "@mui/icons-material/Description";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Chip, Stack, Typography } from "@mui/material";

type SimpleNotificationProps = {
  title: string;
  count: number;
  type: "document" | "vacation";
  inProgress?: boolean;
};

const Icons = {
  document: (
    <DescriptionIcon
      sx={{
        fill: "#4361ee",
      }}
    />
  ),
  vacation: (
    <BeachAccessIcon
      sx={{
        fill: "#4361ee",
      }}
    />
  ),
};

const SimpleNotification = ({
  title,
  type,
  count,
  inProgress,
}: SimpleNotificationProps) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      spacing={2}
      sx={{
        boxShadow:
          "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
        borderRadius: "10px",
        p: 2,
        backgroundColor: "#fff",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        {/* {Icons[type]} */}
        <Typography color="grey">{title}</Typography>
        {inProgress && (
          <Chip
            label="In Progress"
            color="warning"
            size="small"
            variant="outlined"
          />
        )}
      </Stack>
      <Chip label={count} variant="filled" />
    </Stack>
  );
};

export default SimpleNotification;
