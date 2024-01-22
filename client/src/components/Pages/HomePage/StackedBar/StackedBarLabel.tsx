import { Box, Stack, Typography } from "@mui/material";

type StackedBarLabelProps = {
  stackedBarColors: string[];
  status: any;
  count: any;
  index: number;
};

const StackedBarLabel = ({
  stackedBarColors,
  status,
  count,
  index,
}: StackedBarLabelProps) => {
  return (
    <Stack
      direction={"row"}
      gap={2}
      alignItems={"center"}
      sx={{
        p: 1,
        borderRadius: "999px",
        "&:hover": {
          backgroundColor: "#f8f9fa",
        },
      }}
    >
      <Box
        sx={{
          width: 15,
          height: 15,
          borderRadius: "50%",
          backgroundColor: stackedBarColors[index],
        }}
      ></Box>
      <Typography>{status}</Typography>
      <Typography sx={{ marginLeft: "auto" }}>{count}</Typography>
    </Stack>
  );
};

export default StackedBarLabel;
