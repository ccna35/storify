import { Box } from "@mui/material";

const SpinnerOfDoom = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="grid"
      sx={{ placeItems: "center" }}
    >
      <Box width={5} height={5} bgcolor="color.primary"></Box>
    </Box>
  );
};

export default SpinnerOfDoom;
