import {
  DataGridPro,
  GridColDef,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid-pro";

type SimpleDataGridProps = {
  rows: readonly any[];
  columns: GridColDef[];
  id: string;
  columnVisibilityModel?: GridColumnVisibilityModel;
};

const SimpleDataGrid = ({
  rows,
  columns,
  id,
  columnVisibilityModel,
}: SimpleDataGridProps) => {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 350, width: "100%" }}>
        <DataGridPro
          autosizeOnMount
          rowCount={rows.length}
          pagination
          rows={rows as any}
          columns={columns}
          //   loading={isLoading}
          disableRowSelectionOnClick
          disableColumnResize
          disableColumnMenu
          getRowId={(row) => row[id]}
          columnVisibilityModel={columnVisibilityModel}
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
