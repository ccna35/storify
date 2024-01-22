import React from "react";
import ExpiryNotification from "./ExpiryNotification";
import { Stack } from "@mui/material";
import SimpleNotification from "./SimpleNotification";

type NotificationsContainerProps = {
  data: any;
};

const NotificationsContainer = ({ data }: NotificationsContainerProps) => {
  return (
    <>
      <Stack direction={"row"} spacing={2}>
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
      <Stack direction={"row"} spacing={2}>
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
      </Stack>
    </>
  );
};

export default NotificationsContainer;
