import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { QueryFunction, useQuery } from "@tanstack/react-query";
import SimpleDataGrid from "../Pages/HomePage/DataGrids/SimpleDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

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

type BasicModalProps = {
  open: boolean;
  handleClose: () => void;
  dataToRender?: JSX.Element;
  columns?: GridColDef[];
  queryFn?: QueryFunction<any, string[], never>;
  gridId?: string;
};

export default function BasicModal({
  open,
  handleClose,
  dataToRender,
  queryFn,
  columns,
  gridId,
}: BasicModalProps) {
  const { data, isLoading, isSuccess, isError, error, isRefetching } = useQuery(
    {
      queryKey: ["employees"],
      queryFn,
      enabled: open,
    }
  );

  if (isError) {
    console.log(error);
  }

  if (isSuccess) {
    console.log(data);
  }

  if (isRefetching) {
    console.log("isRefetching");
  }
  if (isLoading) {
    console.log("isLoading");
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {dataToRender ??
          (columns &&
            gridId &&
            (isLoading || isRefetching ? (
              <Typography>Loading...</Typography>
            ) : isError ? (
              <Typography>An error happened</Typography>
            ) : (
              <SimpleDataGrid rows={data} columns={columns} id={gridId} />
            )))}
      </Box>
    </Modal>
  );
}
