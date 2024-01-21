import { Chip, Link } from "@mui/material";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

type SimpleDataGridProps = {
  rows: readonly any[];
};

const SimpleDataGrid = ({ rows }: SimpleDataGridProps) => {
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

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 350, width: "100%" }}>
        <DataGridPro
          rowCount={rows.length}
          pagination
          rows={rows as any}
          columns={columns}
          //   loading={isLoading}
          disableRowSelectionOnClick
          getRowId={(row) => row.idWorkOrder}
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
          sx={{
            boxShadow:
              "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
            borderRadius: "10px",
            padding: 2,
          }}
        />
      </div>
    </div>
  );
};

export default SimpleDataGrid;
