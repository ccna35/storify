import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import SimpleDataGrid from "../components/Pages/HomePage/DataGrids/SimpleDataGrid";
import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../api/dashboard";

const EmployeeStatus = () => {
  const { statusType } = useParams();

  const columns = [
    {
      field: "EmpCode",
      headerName: "EmpCode",
      width: 90,
      type: "string",
    },
    {
      field: "EmpName",
      headerName: "EmpName",
      width: 90,
      type: "string",
    },
    {
      field: "EmpNameEn",
      headerName: "EmpNameEn",
      width: 90,
      type: "string",
    },
    {
      field: "EmpTitle",
      headerName: "EmpTitle",
      width: 90,
      type: "string",
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: () => DashboardService.getEmployees(statusType!),
  });

  return (
    <Box>
      <Typography>{statusType}</Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <SimpleDataGrid columns={columns} id="EmpCode" rows={data} />
      )}
    </Box>
  );
};

export default EmployeeStatus;
