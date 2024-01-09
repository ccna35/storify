import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

export default function BasicExampleDataGrid() {
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 1000,
  });

  console.log(data);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        {...data}
        slots={{ toolbar: GridToolbar }}
        sx={{
          "& .MuiButtonBase-root": {
            borderRadius: 3,
            backgroundColor: "#f8f9fa",
            color: "#6c757d",
            padding: ".25rem .75rem",
          },
        }}
      />
    </div>
  );
}
