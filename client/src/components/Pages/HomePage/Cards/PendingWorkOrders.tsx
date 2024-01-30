import { Stack, Typography, Link } from "@mui/material";
import CardHeader from "./CardHeader";
import BasicModal from "../../../Modals/Modal";
import { useMemo, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Link as RouterLink } from "react-router-dom";
import SimpleDataGrid from "../DataGrids/SimpleDataGrid";

type SingleStatProps = {
  pendingOrdersCount: number;
  year: number;
};

const SingleStat = ({ pendingOrdersCount, year }: SingleStatProps) => {
  const color = year === 2024 ? "#01DE9C" : "#FFBA08";
  return (
    <Stack spacing={0} alignItems={"center"}>
      <Typography variant="h2" fontWeight={500} color={color}>
        {pendingOrdersCount}
      </Typography>
      <Typography variant="body1" color={color}>
        {year}
      </Typography>
    </Stack>
  );
};

type PendingWorkOrdersProps = {
  data: any;
};

const PendingWorkOrders = ({ data }: PendingWorkOrdersProps) => {
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

  // Handle modal logic
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack
        onClick={handleOpen}
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
          cursor: "pointer",
          border: "2px solid transparent",
          transition: "border 500ms",
          "&:hover": {
            borderColor: "#1790FF",
          },
        }}
      >
        <Typography variant="h1" fontWeight={500} color="#FFBA08">
          {data.WorkOrdersPending.length}
        </Typography>

        <CardHeader title="Pending Work Orders" />

        {/* <Stack direction={"row"} spacing={4}>
          <Stack spacing={0} alignItems={"center"}>
            <Typography variant="h2" fontWeight={500} color="#FFBA08">
              {data.WorkOrdersPending.length}
            </Typography>
          </Stack>
          <SingleStat
            pendingOrdersCount={
              data.WorkOrdersPending.filter((order) =>
                order.WorkOrderDate.includes("2024")
              ).length
            }
            year={2024}
          />
          <SingleStat
            pendingOrdersCount={
              data.WorkOrdersPending.filter((order) =>
                order.WorkOrderDate.includes("2023")
              ).length
            }
            year={2023}
          />
        </Stack> */}
      </Stack>
      <BasicModal
        open={open}
        handleClose={handleClose}
        dataToRender={
          <SimpleDataGrid
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
        }
      />
    </>
  );
};

export default PendingWorkOrders;
