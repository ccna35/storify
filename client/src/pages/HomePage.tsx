import { Box, Divider, Stack, Typography, Link } from "@mui/material";
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

const SimpleDataGridWithHeadline = withHeadline(
  SimpleDataGrid,
  "Pending Work Orders"
);

const HomePage = () => {
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "idWorkOrder",
        headerName: "idWorkOrder",
        width: 90,
        type: "number",
      },
      {
        field: "WorkOrderNo",
        headerName: "WorkOrderNo",
        width: 150,
        type: "string",
        renderCell: ({ value }) => {
          return (
            <Link component={RouterLink} to={`/workOrders/${value}`}>
              {value}
            </Link>
          );
        },
      },
      {
        field: "GovernoratesName",
        headerName: "GovernoratesName",
        width: 90,
        type: "string",
      },
      {
        field: "WorkOrderDate",
        headerName: "Creation Date",
        width: 90,
        type: "date",
        valueGetter: ({ value }) => value && new Date(value),
      },
      {
        field: "LastUpdateDate",
        headerName: "LastUpdateDate",
        width: 90,
        type: "date",
        valueGetter: ({ value }) => value && new Date(value),
      },
      {
        field: "ActionDate",
        headerName: "ActionDate",
        width: 90,
        type: "date",
        valueGetter: ({ value }) => value && new Date(value),
      },
      {
        field: "TeamLeadersName",
        headerName: "TeamLeadersName",
        width: 90,
        type: "string",
      },
      {
        field: "SiteType",
        headerName: "SiteType",
        width: 90,
        type: "string",
      },
      {
        field: "CompanyProjectsName",
        headerName: "CompanyProjectsName",
        width: 90,
        type: "string",
      },
      {
        field: "SubProjectsName",
        headerName: "SubProjectsName",
        width: 90,
        type: "string",
      },
      {
        field: "SiteName",
        headerName: "Site Name",
        width: 90,
        type: "string",
      },
      {
        field: "SiteCode",
        headerName: "Site Code",
        width: 90,
        type: "string",
      },
      {
        field: "ERPUserNickName",
        headerName: "Created By",
        width: 90,
        type: "string",
      },
      {
        field: "ActionID",
        headerName: "ActionID",
        width: 90,
        type: "number",
      },
      {
        field: "WorkOrderStatus",
        headerName: "WorkOrderStatus",
        width: 90,
        type: "string",
      },
    ],
    []
  );

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => DashboardService.getDashboard(),
  });

  // return (
  //   <Typography variant="h5" component={"h1"} fontWeight={500}>
  //     Hi, Welcome back 👋
  //   </Typography>
  // );

  return (
    <Stack direction="column" spacing={4} sx={{ width: "100%" }}>
      <Typography variant="h5" component={"h1"} fontWeight={500}>
        Hi, Welcome back 👋
      </Typography>

      {isLoading ? (
        <SpinnerOfDoom />
      ) : (
        <>
          <NotificationsContainer data={data} />
          <Divider
            variant="fullWidth"
            orientation="horizontal"
            sx={{
              borderStyle: "dashed",
            }}
          />
          <Box
            sx={{
              display: "grid",
              // flexDirection: "row",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 3,
              // justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <EmployeesInsuranceStatus data={data} />

            <BarComponent
              data={data.AllWorkOrderStatusThisYear}
              barTitle="WorkOrderStatus"
              chartTitle="Work Orders By Status"
            />

            <BarComponent
              data={data.AllQuotationStatusThisYear}
              barTitle="WorkOrderD6Status"
              chartTitle="Pending Quotation Status"
            />
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
                // type="pie"
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
            <Box
              flex={1}
              sx={{
                boxShadow:
                  "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
                borderRadius: "10px",
                padding: 2,
              }}
            >
              {/* <DemoBarChart
                // horizontal
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
              /> */}
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
          </Box>
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
          {/* <InsuranceContainer data={data} /> */}
          {/* <StackedBarsContainer data={data} /> */}
        </>
      )}
    </Stack>
  );
};

export default HomePage;
