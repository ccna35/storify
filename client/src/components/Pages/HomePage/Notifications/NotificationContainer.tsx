import React, { useState } from "react";
import ExpiryNotification from "./ExpiryNotification";
import { Box, Divider, Stack, Tab, Typography } from "@mui/material";
import SimpleNotification from "./SimpleNotification";
import BasicDateCalendar from "../BasicDatePicker";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ArrowBackIosSharp, ArrowForwardIosSharp } from "@mui/icons-material";
import EmployeeStatus from "../../../../pages/EmployeeStatus";
import EmployeesInsuranceStatus from "../EmployeesInsuranceStatus";

type NotificationsContainerProps = {
  data: any;
};

const NotificationsContainer = ({ data }: NotificationsContainerProps) => {
  const [tabValue, setTabValue] = useState<"1" | "2">("1");

  const handleChange = (event: React.SyntheticEvent, newValue: "1" | "2") => {
    setTabValue(newValue);
  };

  return (
    <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
      <Stack
        direction={"column"}
        alignItems={"stretch"}
        justifyContent={"space-between"}
        spacing={2}
        sx={{
          boxShadow:
            "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
          borderRadius: "10px",
          padding: 2,
          backgroundColor: "#fff",
        }}
        divider={
          <Divider
            orientation="horizontal"
            flexItem
            sx={{ borderStyle: "dashed" }}
          />
        }
      >
        <ExpiryNotification
          title="Expired National ID"
          expiredCount={data.EmpNationalIDExpired[0].Count}
          expiringNextMonthCount={data.EmpNationalIDExpiredNextMonth[0].Count}
          type="id"
        />
        <ExpiryNotification
          title="Expired Car Licences"
          expiredCount={data.CarNowithCarLicenceExpire[0].Count}
          expiringNextMonthCount={
            data.CarNowithCarLicenceExpireNextMonth[0].Count
          }
          type="car"
        />
        <ExpiryNotification
          title="Expired Driving Licences"
          expiredCount={data.EmpDrivingLicenceExpired[0].Count}
          expiringNextMonthCount={
            data.EmpDrivingLicenceExpiredNextMonth[0].Count
          }
          type="driver"
        />
      </Stack>

      <Box
        sx={{
          boxShadow:
            "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
          borderRadius: "10px",
          pt: 2,
          flexGrow: 1,
          backgroundColor: "#fff",
        }}
      >
        <TabContext value={tabValue}>
          <Box>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                ".MuiTabs-indicator": {
                  backgroundColor: "transparent",
                },
                // borderBottom: "1px dashed lightgrey",
              }}
            >
              <Tab
                value="1"
                icon={
                  <ArrowBackIosSharp
                    fontSize="small"
                    sx={{
                      color: tabValue === "1" ? "lightgray" : "grey",
                      transition: "all 300ms",
                    }}
                  />
                }
                disableRipple
              />
              <Tab
                value="2"
                icon={
                  <ArrowForwardIosSharp
                    fontSize="small"
                    sx={{
                      color: tabValue === "2" ? "lightgray" : "grey",
                      transition: "all 300ms",
                    }}
                  />
                }
                disableRipple
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{}}>
            <Stack spacing={2}>
              <SimpleNotification
                title="Quotations Not Invoiced"
                type="document"
                count={data.AllQuotationsNotInvoiced[0].Count}
              />
              <SimpleNotification
                title="Vacations Without Attachment"
                type="vacation"
                count={data.AllVacationNoAttachmentCount[0].Count}
              />
              <SimpleNotification
                title="Invoices With No PO"
                type="document"
                count={data.AllInvoicesWithNoPO[0].Count}
              />
              <SimpleNotification
                title="Invoices With No Government Invoice"
                type="document"
                count={data.AllInvoicesWithNoGovernmentInvoice[0].Count}
              />
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Stack spacing={2}>
              <SimpleNotification
                title="Invoices With No Submission Date"
                type="document"
                count={data.AllInvoicesWithNoSubmissionDate[0].Count}
              />
              <SimpleNotification
                title="Missions Change Requests Count"
                type="document"
                count={data.MissionsChangeRequestsCount[0].Count}
                inProgress
              />
              <SimpleNotification
                title="Materials Change Requests Count"
                type="document"
                count={data.MaterialsChangeRequestsCount[0].Count}
                inProgress
              />
              <SimpleNotification
                title="Materials Request Sent Count"
                type="document"
                count={data.MaterialsRequestSentCount[0].Count}
              />
            </Stack>
          </TabPanel>
        </TabContext>
      </Box>

      {/* <BasicDateCalendar /> */}
    </Stack>
  );
};

export default NotificationsContainer;
