import { Box } from "@mui/material";
import DemoPieChart from "./PieCharts/DemoPieChart";

type InsuranceContainerProps = {
  data: any;
};

const InsuranceContainer = ({ data }: InsuranceContainerProps) => {
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
        <DemoPieChart
          title="Medical Insurance"
          type="pie"
          labels={["Covered", "Not Covered"]}
          series={[
            data.CountCoveredMedical[0].Count,
            data.CountNotCoveredMedical[0].Count,
          ]}
          colors={["#52b788", "#e63946"]}
        />
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
        <DemoPieChart
          title="Social Insurance"
          type="pie"
          labels={["Insured", "Not Insured"]}
          series={[
            data.CountInsured[0].Count,
            data.GetCountNotInsured[0].Count,
          ]}
          colors={["#52b788", "#e63946"]}
        />
      </Box>
    </Box>
  );
};

export default InsuranceContainer;
