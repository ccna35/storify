import { Box, Grid, Stack } from "@mui/material";
import DemoBarChart from "../components/Pages/HomePage/Charts/DemoBarChart";
import SimpleDataGrid from "../components/Pages/HomePage/DataGrids/SimpleDataGrid";
import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../api/dashboard";
import SpinnerOfDoom from "../components/Spinners/SpinnerOfDoom";
import DemoPieChart from "../components/Pages/HomePage/PieCharts/DemoPieChart";
import NotificationsContainer from "../components/Pages/HomePage/Notifications/NotificationContainer";
import withHeadline from "../components/Pages/HomePage/withHeadline";
import EmployeesInsuranceStatus from "../components/Pages/HomePage/EmployeesInsuranceStatus";
import BarComponent from "../components/Pages/HomePage/BarComponent";
import DemoLineChart from "../components/Pages/HomePage/Charts/DemoLineChart";
import PendingWorkOrders from "../components/Pages/HomePage/Cards/PendingWorkOrders";
import ExpiryNotification from "../components/Pages/HomePage/Notifications/ExpiryNotification";
import SimpleNotification from "../components/Pages/HomePage/Notifications/SimpleNotification";

const SimpleDataGridWithHeadline = withHeadline(
  SimpleDataGrid,
  "Pending Work Orders"
);

const HomePage = () => {
  // const { showBoundary } = useErrorBoundary();

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    initialData: [],
    queryKey: ["dashboard"],
    queryFn: () => DashboardService.getDashboard(),
  });

  // if (isError) {
  //   showBoundary(error);
  // }

  // return (
  //   <Typography variant="h5" component={"h1"} fontWeight={500}>
  //     Hi, Welcome back 👋
  //   </Typography>
  // );

  if (isLoading || data.length === 0) {
    return <SpinnerOfDoom />;
  }

  const {
    AllWorkOrdersCreatedPerProject,
    WorkOrdersAndWaitingApprovalPerProject,
    WorkOrderComplete,
    WorkOrderCompleteLastYear,
    QuotationComplete,
    QuotationCompleteLastYear,
    AllWorkOrderStatusThisYear,
    AllQuotationStatusThisYear,
    AllWorkOrdersInProgressPerProject,
    AllMissionsInProgressPerProject,
    GetCountNotInsured,
    CountInsured,
    CountCoveredMedical,
    CountNotCoveredMedical,
    EmpNationalIDExpired,
    EmpNationalIDExpiredNextMonth,
    EmpDrivingLicenceExpired,
    EmpDrivingLicenceExpiredNextMonth,
    CarNowithCarLicenceExpire,
    CarNowithCarLicenceExpireNextMonth,
    AllVacationNoAttachmentCount,
    AllQuotationsNotInvoiced,
    AllInvoicesWithNoPO,
    AllInvoicesWithNoGovernmentInvoice,
    AllInvoicesWithNoSubmissionDate,
    MaterialsChangeRequestsCount,
    MaterialsRequestSentCount,
    MissionsChangeRequestsCount,
  } = data;

  const expirationData = {
    EmpNationalIDExpired,
    EmpNationalIDExpiredNextMonth,
    CarNowithCarLicenceExpire,
    CarNowithCarLicenceExpireNextMonth,
    EmpDrivingLicenceExpired,
    EmpDrivingLicenceExpiredNextMonth,
  };

  console.log(Object.values(expirationData).every((item) => item.length === 0));

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {!Object.values(expirationData).every((item) => item.length === 0) && (
        <Grid item xs={4}>
          {/* <NotificationsContainer data={data} /> */}
          <Stack direction={"column"} spacing={2}>
            {data.EmpNationalIDExpired.length !== 0 && (
              <ExpiryNotification
                title="Expired National ID"
                expiredCount={data.EmpNationalIDExpired[0].Count}
                expiringNextMonthCount={
                  data.EmpNationalIDExpiredNextMonth[0].Count
                }
                type="id"
              />
            )}

            {data.CarNowithCarLicenceExpire.length !== 0 && (
              <ExpiryNotification
                title="Expired Car Licences"
                expiredCount={data.CarNowithCarLicenceExpire[0].Count}
                expiringNextMonthCount={
                  data.CarNowithCarLicenceExpireNextMonth[0].Count
                }
                type="car"
              />
            )}

            {data.EmpDrivingLicenceExpired.length !== 0 && (
              <ExpiryNotification
                title="Expired Driving Licences"
                expiredCount={data.EmpDrivingLicenceExpired[0].Count}
                expiringNextMonthCount={
                  data.EmpDrivingLicenceExpiredNextMonth[0].Count
                }
                type="driver"
              />
            )}
          </Stack>
        </Grid>
      )}

      {/* <Grid item xs={4}>
        <Stack direction={"column"} spacing={2}>
          {data.AllQuotationsNotInvoiced.length !== 0 && (
            <SimpleNotification
              title="Quotations Not Invoiced"
              type="document"
              count={data.AllQuotationsNotInvoiced[0].Count}
            />
          )}

          {data.AllVacationNoAttachmentCount.length !== 0 && (
            <SimpleNotification
              title="Vacations Without Attachment"
              type="vacation"
              count={data.AllVacationNoAttachmentCount[0].Count}
            />
          )}
          {data.AllInvoicesWithNoPO.length !== 0 && (
            <SimpleNotification
              title="Invoices With No PO"
              type="document"
              count={data.AllInvoicesWithNoPO[0].Count}
            />
          )}
          {data.AllInvoicesWithNoGovernmentInvoice.length !== 0 && (
            <SimpleNotification
              title="Invoices With No Government Invoice"
              type="document"
              count={data.AllInvoicesWithNoGovernmentInvoice[0].Count}
            />
          )}
        </Stack>
      </Grid> */}
      {/* <Grid item xs={4}>
        <Stack direction={"column"} spacing={2}>
          {data.AllInvoicesWithNoSubmissionDate.length !== 0 && (
            <SimpleNotification
              title="Invoices With No Submission Date"
              type="document"
              count={data.AllInvoicesWithNoSubmissionDate[0].Count}
            />
          )}

          {data.MissionsChangeRequestsCount.length !== 0 && (
            <SimpleNotification
              title="Missions Change Requests Count"
              type="document"
              count={data.MissionsChangeRequestsCount[0].Count}
              inProgress
            />
          )}

          {data.MaterialsChangeRequestsCount.length !== 0 && (
            <SimpleNotification
              title="Materials Change Requests Count"
              type="document"
              count={data.MaterialsChangeRequestsCount[0].Count}
              inProgress
            />
          )}

          {data.MaterialsRequestSentCount.length !== 0 && (
            <SimpleNotification
              title="Materials Request Sent Count"
              type="document"
              count={data.MaterialsRequestSentCount[0].Count}
            />
          )}
        </Stack>
      </Grid> */}
      {CountInsured?.length !== 0 && (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <EmployeesInsuranceStatus data={data} />
        </Grid>
      )}
      {data.AllWorkOrderStatusThisYear.length !== 0 && (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <BarComponent
            data={data.AllWorkOrderStatusThisYear}
            barTitle="WorkOrderStatus"
            chartTitle="Work Orders By Status"
          />
        </Grid>
      )}

      {data.AllQuotationStatusThisYear.length !== 0 && (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <BarComponent
            data={data.AllQuotationStatusThisYear}
            barTitle="WorkOrderD6Status"
            chartTitle="Pending Quotation Status"
          />
        </Grid>
      )}

      {data.WorkOrdersPending.length !== 0 && (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <PendingWorkOrders data={data} />
        </Grid>
      )}

      {/* Work orders received ------ Work orders in progress */}
      {data.WorkOrderComplete.length !== 0 && (
        <Grid item xs={12} sm={6}>
          <Box
            flex={1}
            sx={{
              boxShadow:
                "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
              borderRadius: "10px",
              padding: 2,
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <DemoBarChart
              title="Work orders received"
              xaxis={{
                categories: data.WorkOrderComplete.map((order) => order.Month),
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
      )}

      {data.AllWorkOrdersInProgressPerProject.length !== 0 && (
        <Grid item xs={12} sm={6}>
          <Box
            flex={1}
            sx={{
              boxShadow:
                "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
              borderRadius: "10px",
              padding: 2,
              backgroundColor: "white",
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
      )}

      {/* Work Orders Per Project -------- Quotation Approved */}
      {data.AllWorkOrdersCreatedPerProject.length !== 0 && (
        <Grid item xs={12} sm={6}>
          <Box
            flex={1}
            sx={{
              boxShadow:
                "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
              borderRadius: "10px",
              padding: 2,
              width: "100%",
              backgroundColor: "white",
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
      )}

      {data.QuotationComplete.length !== 0 &&
        data.QuotationCompleteLastYear.length !== 0 && (
          <Grid item xs={12} sm={6}>
            <Box
              flex={1}
              sx={{
                boxShadow:
                  "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
                borderRadius: "10px",
                padding: 1,
                width: "100%",
                backgroundColor: "white",
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
        )}

      {/* Open missions ------ Completed work without acceptance */}
      {data.WorkOrdersAndWaitingApprovalPerProject.length !== 0 && (
        <Grid item xs={12} sm={6}>
          <Box
            flex={1}
            sx={{
              boxShadow:
                "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
              borderRadius: "10px",
              padding: 1,
              backgroundColor: "white",
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
      )}

      {data.AllMissionsInProgressPerProject.length !== 0 && (
        <Grid item xs={12} sm={6}>
          <Box
            flex={1}
            sx={{
              boxShadow:
                "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
              borderRadius: "10px",
              padding: 1,
              backgroundColor: "white",
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
      )}
    </Grid>
  );
};

export default HomePage;
