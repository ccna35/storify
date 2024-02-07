import React, { useState } from "react";
import ExpiryNotification from "./ExpiryNotification";
import { Box, Divider, Stack, Tab } from "@mui/material";
import SimpleNotification from "./SimpleNotification";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ArrowBackIosSharp, ArrowForwardIosSharp } from "@mui/icons-material";

type NotificationsContainerProps = {
  data: any;
};

const NotificationsContainer = ({ data }: NotificationsContainerProps) => {
  const [tabValue, setTabValue] = useState<"1" | "2">("1");

  const handleChange = (event: React.SyntheticEvent, newValue: "1" | "2") => {
    setTabValue(newValue);
  };

  return (
    <Stack direction={"row"} spacing={2}>
      <Stack direction={"column"} spacing={2}>
        {data.EmpNationalIDExpired.length !== 0 && (
          <ExpiryNotification
            title="Expired National ID"
            expiredCount={data.EmpNationalIDExpired[0].Count}
            expiringNextMonthCount={data.EmpNationalIDExpiredNextMonth[0].Count}
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
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
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
      </Box>
    </Stack>
  );
};

export default NotificationsContainer;
