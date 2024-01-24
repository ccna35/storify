import { Box, Stack, Tooltip, Typography } from "@mui/material";

const barColors = [
  "#ffba08",
  "#ff5e5b",
  "#4361ee",
  "#52b788",
  "#9d4edd",
  "#ff595e",
];

type SingleBarProps = {
  title: string;
  count: number;
  percentage: number;
  index: number;
};

const SingleBar = ({ title, count, percentage, index }: SingleBarProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        alignItems: "center",
        gap: 4,
        gridTemplateColumns: "2fr 3fr",
      }}
    >
      <Typography color="grey">{title}</Typography>
      <Stack spacing={1} flexGrow={1}>
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box
            sx={{
              width: percentage + "%",
              height: 10,
              backgroundColor: barColors[index],
              borderRadius: "999px",
            }}
          ></Box>
          <Typography color="grey">{count}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

type BarComponentProps = {
  data: any;
  barTitle: string;
  chartTitle: string;
};

const BarComponent = ({ data, barTitle, chartTitle }: BarComponentProps) => {
  return (
    <Box
      component={"article"}
      sx={{
        backgroundColor: "white",
        p: 2,
        border: "1px solid lighgrey",
        boxShadow:
          "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h6" color="#1790FF" textAlign={"center"} mb={3}>
        {chartTitle}
      </Typography>
      <Stack spacing={1}>
        {data.map((order, index) => {
          return (
            <SingleBar
              key={order[barTitle]}
              title={order[barTitle]}
              count={order.Count}
              percentage={order.Percentage}
              index={index}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default BarComponent;
