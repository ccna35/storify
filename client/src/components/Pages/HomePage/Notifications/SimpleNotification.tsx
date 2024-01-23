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
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        // justifyContent={"space-between"}
      >
        {Icons[type]}
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
