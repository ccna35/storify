import { Box, Divider, Stack, Typography, Link, Grid } from "@mui/material";
import DemoBarChart from "../components/Pages/HomePage/Charts/DemoBarChart";
import SimpleDataGrid from "../components/Pages/HomePage/DataGrids/SimpleDataGrid";
import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../api/dashboard";
import SpinnerOfDoom from "../components/Spinners/SpinnerOfDoom";
import DemoPieChart from "../components/Pages/HomePage/PieCharts/DemoPieChart";
import NotificationsContainer from "../components/Pages/HomePage/Notifications/NotificationContainer";
import StackedBarsContainer from "../components/Pages/HomePage/StackedBar/StackedBarsContainer";
import InsuranceContainer from "../components/Pages/HomePage/InsuranceContainer";
import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
import withHeadline from "../components/Pages/HomePage/withHeadline";
import EmployeesInsuranceStatus from "../components/Pages/HomePage/EmployeesInsuranceStatus";
import BarComponent from "../components/Pages/HomePage/BarComponent";
import DemoLineChart from "../components/Pages/HomePage/Charts/DemoLineChart";
import CardHeader from "../components/Pages/HomePage/Cards/CardHeader";
import PendingWorkOrders from "../components/Pages/HomePage/Cards/PendingWorkOrders";

const SimpleDataGridWithHeadline = withHeadline(
  SimpleDataGrid,
  "Pending Work Orders"
);

const HomePage = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => DashboardService.getDashboard(),
  });

  // return (
  //   <Typography variant="h5" component={"h1"} fontWeight={500}>
  //     Hi, Welcome back 👋
  //   </Typography>
  // );

  return (
    <>
      {isLoading ? (
        <SpinnerOfDoom />
      ) : (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          <Grid item xs={12}>
            <NotificationsContainer data={data} />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <EmployeesInsuranceStatus data={data} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <BarComponent
              data={data.AllWorkOrderStatusThisYear}
              barTitle="WorkOrderStatus"
              chartTitle="Work Orders By Status"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <BarComponent
              data={data.AllQuotationStatusThisYear}
              barTitle="WorkOrderD6Status"
              chartTitle="Pending Quotation Status"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <PendingWorkOrders data={data} />
            {/* <Stack
            component={"article"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                boxShadow:
                  "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
                borderRadius: "10px",
                padding: 2,
                backgroundColor: "#fff",
              }}
            >
              <CardHeader title="Pending Work Orders" />
              <Stack direction={"row"} spacing={4}>
                <Stack spacing={1} alignItems={"center"}>
                  <Typography variant="h2" fontWeight={500} color="#01DE9C">
                    {
                      data.WorkOrdersPending.filter((order) =>
                        order.WorkOrderDate.includes("2024")
                      ).length
                    }
                  </Typography>
                  <Typography variant="body1" color="#01DE9C">
                    2024
                  </Typography>
                </Stack>
                <Stack spacing={1} alignItems={"center"}>
                  <Typography variant="h2" fontWeight={500} color="#FFBA08">
                    {
                      data.WorkOrdersPending.filter((order) =>
                        order.WorkOrderDate.includes("2023")
                      ).length
                    }
                  </Typography>
                  <Typography variant="body1" color="#FFBA08">
                    2023
                  </Typography>
                </Stack>
              </Stack>
            </Stack> */}
          </Grid>

          {/* Work orders received ------ Work orders in progress */}
          <Grid item xs={12} sm={6}>
            <Box
              flex={1}
              sx={{
                boxShadow:
                  "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
                borderRadius: "10px",
                padding: 2,
                width: "100%",
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
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>

          {/* Work Orders Per Project -------- Quotation Approved */}
          <Grid item xs={12} sm={6}>
            <Box
              flex={1}
              sx={{
                boxShadow:
                  "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
                borderRadius: "10px",
                padding: 2,
                width: "100%",
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              flex={1}
              sx={{
                boxShadow:
                  "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
                borderRadius: "10px",
                padding: 1,
                width: "100%",
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
          </Grid>

          {/* Open missions ------ Completed work without acceptance */}
          <Grid item xs={12} sm={6}>
            <Box
              flex={1}
              sx={{
                boxShadow:
                  "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
                borderRadius: "10px",
                padding: 1,
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
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              flex={1}
              sx={{
                boxShadow:
                  "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
                borderRadius: "10px",
                padding: 1,
              }}
            >
              <DemoLineChart
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
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <SimpleDataGridWithHeadline
              rows={data.WorkOrdersPending}
              columns={columns}
              id="idWorkOrder"
              columnVisibilityModel={{
                idWorkOrder: false,
                LastUpdateDate: false,
                ActionDate: false,
                ActionID: false,
                GovernoratesName: false,
                SubProjectsName: false,
                SiteType: false,
                CompanyProjectsName: false,
                WorkOrderStatus: false,
              }}
            />
          </Grid> */}
        </Grid>
      )}
    </>
  );
};

export default HomePage;
