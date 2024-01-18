import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const CustomBar = () => {
  return (
    <Box
      sx={{
        width: 10,
        height: 100,
        backgroundColor: "indigo",
      }}
    ></Box>
  );
};

export default function DemoBarCharts() {
  return (
    <BarChart
      slotProps={{ bar: { onClick: (e) => console.log(e.currentTarget) } }}
      //   slots={{
      //     bar: (props) => {
      //       console.log(props.ownerState);

      //       const radius = 7;
      //       //   const { x, y, height, width, color, ...restProps } = props;

      //       //   console.log("x: ", x, "y: ", y, "height: ", height, "width: ", width);

      //       // Path of a rectangle with rounded corners on the right
      //       // for horizontal layout

      //       const x = 1;
      //       const y = 1;
      //       const height = 50;
      //       const width = 10;
      //       const color = "lightgrey";

      //       const d = `M${x},${y} h${
      //         width - radius
      //       } a${radius},${radius} 0 0 1 ${radius},${radius}v ${
      //         height - 2 * radius
      //       } a${radius},${radius} 0 0 1 ${-radius},${radius} h${
      //         radius - width
      //       }z`;

      //       //   return <path d={d} fill={color} />;.
      //       return <rect className={props.cl}></rect>;
      //     },
      //   }}
      width={500}
      height={300}
      series={[
        { data: pData, label: "pv", id: "pvId" },
        { data: uData, label: "uv", id: "uvId" },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    />
  );
}
