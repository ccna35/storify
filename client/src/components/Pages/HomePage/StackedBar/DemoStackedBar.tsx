import { Stack } from "@mui/material";
import StackedBar from "./StackedBar";
import StackedBarLabel from "./StackedBarLabel";

type DemoStackedBarProps = {
  allStatuses: any;
};

const stackedBarColors = [
  "#ffba08",
  "#ff5e5b",
  "#4361ee",
  "#52b788",
  "#9d4edd",
  "#ff595e",
];

const DemoStackedBar = ({ allStatuses }: DemoStackedBarProps) => {
  return (
    <>
      <StackedBar
        series={allStatuses.map((order) => {
          return { name: order.WorkOrderStatus, data: [order.Count] };
        })}
        title="Work orders by status"
        colors={stackedBarColors}
      />
      <Stack direction={"column"} spacing={1}>
        {allStatuses.map((order, index) => {
          return (
            <StackedBarLabel
              key={order.WorkOrderStatus}
              stackedBarColors={stackedBarColors}
              count={order.Count}
              status={order.WorkOrderStatus}
              index={index}
            />
          );
        })}
      </Stack>
    </>
  );
};

export default DemoStackedBar;
