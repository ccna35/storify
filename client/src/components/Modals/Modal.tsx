import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useQuery } from "@tanstack/react-query";
import { DashboardService } from "../../api/dashboard";
import SimpleDataGrid from "../Pages/HomePage/DataGrids/SimpleDataGrid";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  p: 4,
};

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

type BasicModalProps = {
  open: boolean;
  handleClose: () => void;
  status: string;
};

export default function BasicModal({
  open,
  handleClose,
  status,
}: BasicModalProps) {
  console.log("Rendered: ", status);

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["employees"],
    queryFn: () => DashboardService.getEmployees(status),
    enabled: open,
  });

  if (isError) {
    console.log(error);
  }

  if (isSuccess) {
    console.log(data);
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <SimpleDataGrid columns={columns} id="EmpCode" rows={data} />
        )}

        {isError && <Typography>An error happened</Typography>}
      </Box>
    </Modal>
  );
}
