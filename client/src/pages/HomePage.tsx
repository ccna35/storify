import { Box, Stack, Typography } from "@mui/material";
import DemoBarChart from "../components/Pages/HomePage/Charts/DemoBarChart";
import SimpleDataGrid from "../components/Pages/HomePage/DataGrids/SimpleDataGrid";
import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../api/dashboard";
import SpinnerOfDoom from "../components/Spinners/SpinnerOfDoom";
import DemoPieChart from "../components/Pages/HomePage/PieCharts/DemoPieChart";
import StackedBar from "../components/Pages/HomePage/StackedBar/StackedBar";

const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => DashboardService.getDashboard(),
  });

  return (
    <Stack direction="column" spacing={4}>
      <Typography variant="h5" component={"h1"} fontWeight={500}>
        Hi, Welcome back 👋
      </Typography>

      {isLoading ? (
        <SpinnerOfDoom />
      ) : (
        <>
          <SimpleDataGrid rows={data.WorkOrdersPending} />

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
              <DemoBarChart
                title="Work orders received"
                xaxis={{
                  categories: data.WorkOrderComplete.map(
                    (order) => order.Month
                  ),
                }}
                series={[
                  {
                    data: data.WorkOrderCompleteLastYear.map(
                      (order) => order.Count
                    ),
                    name: "2023",
                  },
                  {
                    data: data.WorkOrderComplete.map((order) => order.Count),
                    name: "2024",
                  },
                ]}
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
                title="Work orders in progress"
                labels={data.AllWorkOrdersInProgressPerProject.map(
                  (order) => order.CompanyProjectsName
                )}
                series={data.AllWorkOrdersInProgressPerProject.map(
                  (order) => order.Count
                )}
              />
            </Box>
          </Box>

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
              <DemoBarChart
                title="Work Orders Per Project"
                xaxis={{
                  categories: data.AllWorkOrdersCreatedPerProject.map(
                    (order) => order.CompanyProjectsName
                  ),
                }}
                series={[
                  {
                    data: data.AllWorkOrdersCreatedPerProject.map(
                      (order) => order.Count_LastYear
                    ),
                    name: "2023",
                  },
                  {
                    data: data.AllWorkOrdersCreatedPerProject.map(
                      (order) => order.Count_ThisYear
                    ),
                    name: "2024",
                  },
                ]}
              />
            </Box>

            <Box
              flex={1}
              sx={{
                boxShadow:
                  "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
                borderRadius: "10px",
                padding: 1,
              }}
            >
              <DemoBarChart
                title="Quotation Approved"
                xaxis={{
                  categories: data.QuotationComplete.map(
                    (order) => order.Month
                  ),
                }}
                series={[
                  {
                    data: data.QuotationCompleteLastYear.filter(
                      (order) => order.Month == "January"
                    ).map((order) => order.Count),
                    name: "2023",
                  },
                  {
                    data: data.QuotationComplete.filter(
                      (order) => order.Month == "January"
                    ).map((order) => order.Count),
                    name: "2024",
                  },
                ]}
              />
            </Box>
          </Box>
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
              <DemoBarChart
                horizontal
                title="Completed work without acceptance"
                xaxis={{
                  categories: data.WorkOrdersAndWaitingApprovalPerProject.map(
                    (order) => order.CompanyProjectsName
                  ),
                }}
                series={[
                  {
                    data: data.WorkOrdersAndWaitingApprovalPerProject.map(
                      (order) => order.Count
                    ),
                    name: "2023",
                  },
                ]}
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
                title="Open missions"
                labels={data.AllMissionsInProgressPerProject.map(
                  (order) => order.CompanyProjectsName
                )}
                series={data.AllMissionsInProgressPerProject.map(
                  (order) => order.Count
                )}
              />
            </Box>
          </Box>
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
              <StackedBar
                series={data.AllQuotationStatusThisYear.map((order) => {
                  return { name: order.WorkOrderD6Status, data: [order.Count] };
                })}
                title="Pending Quotation status"
              />
            </Box>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default HomePage;
