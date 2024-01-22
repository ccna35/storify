import { Box, Stack } from "@mui/material";
import StackedBar from "./StackedBar";
import StackedBarLabel from "./StackedBarLabel";

const stackedBarColors = [
  "#ffba08",
  "#ff5e5b",
  "#4361ee",
  "#52b788",
  "#9d4edd",
  "#ff595e",
];

type StackedBarsContainerPorps = {
  data: any;
};

const StackedBarsContainer = ({ data }: StackedBarsContainerPorps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 3,
      }}
    >
      <Box
        flex={1}
        sx={{
          boxShadow:
            "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
          borderRadius: "10px",
          padding: 2,
        }}
      >
        <StackedBar
          series={data.AllWorkOrderStatusThisYear.map((order) => {
            return { name: order.WorkOrderStatus, data: [order.Count] };
          })}
          title="Work orders by status"
          colors={stackedBarColors}
        />
        <Stack direction={"column"} spacing={1}>
          {data.AllWorkOrderStatusThisYear.map((order, index) => {
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
      </Box>
      <Box
        flex={1}
        sx={{
          boxShadow:
            "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
          borderRadius: "10px",
          padding: 2,
        }}
      >
        <StackedBar
          series={data.AllQuotationStatusThisYear.map((order) => {
            return { name: order.WorkOrderD6Status, data: [order.Count] };
          })}
          title="Pending Quotation status"
          colors={stackedBarColors}
        />
        <Stack direction={"column"} spacing={1}>
          {data.AllQuotationStatusThisYear.map((order, index) => {
            return (
              <StackedBarLabel
                key={order.WorkOrderD6Status}
                stackedBarColors={stackedBarColors}
                count={order.Count}
                status={order.WorkOrderD6Status}
                index={index}
              />
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default StackedBarsContainer;
