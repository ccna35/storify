import { Box, Skeleton, Stack, Typography } from "@mui/material";

const SpinnerOfDoom = () => {
  return <Typography>Loading</Typography>;

  return (
    <Box sx={{ width: "100%" }}>
      {Array.from("abcdefghijklmnopqr").map((char) => {
        const randomWidth = Math.floor(Math.random() * 100);
        const randomHeight = Math.floor(Math.random() * 100);
        console.log(randomHeight);

        return (
          <Stack spacing={1} direction={"row"}>
            <Skeleton
              key={char}
              animation="wave"
              height={randomHeight}
              width={`${randomWidth}%`}
            />
            <Skeleton
              key={char}
              animation="wave"
              height={randomHeight}
              width={`${100 - randomWidth}%`}
            />
          </Stack>
        );
      })}
    </Box>
  );
};

export default SpinnerOfDoom;
