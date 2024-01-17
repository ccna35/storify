import { Box, Skeleton, Stack, Typography } from "@mui/material";

const SpinnerOfDoom = () => {
  // return <Typography>Loading</Typography>;

  return (
    <Box>
      <Skeleton animation="wave" height={500} />
    </Box>
  );
};

export default SpinnerOfDoom;
