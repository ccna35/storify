import { Box, Stack, Tooltip, Typography } from "@mui/material";
import CardHeader from "./Cards/CardHeader";

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
  showTitle?: boolean;
};

const SingleBar = ({
  title,
  count,
  percentage,
  index,
  showTitle,
}: SingleBarProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        alignItems: "center",
        gap: 4,
        gridTemplateColumns: showTitle ? "2fr 3fr" : "1fr",
      }}
    >
      {showTitle && <Typography color="grey">{title}</Typography>}
      <Stack spacing={1} flexGrow={1}>
        <Box
          sx={{
            display: "grid",
            flexGrow: 1,
            alignItems: "center",
            gap: 4,
            gridTemplateColumns: "1fr 25px",
          }}
        >
          <Tooltip title={title} arrow placement="top" sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                width: "100%",
                height: 10,
                backgroundColor: "#FAFAFB",
                borderRadius: "999px",
              }}
            >
              <Box
                sx={{
                  width: percentage + "%",
                  height: 10,
                  backgroundColor: barColors[index],
                  borderRadius: "999px",
                }}
              ></Box>
            </Box>
          </Tooltip>
          <Typography color="grey" textAlign={"right"}>
            {count}
          </Typography>
        </Box>
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
      <CardHeader title={chartTitle} />

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
