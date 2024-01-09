import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "../api";
import SpinnerOfDoom from "./Spinners/SpinnerOfDoom";
import {
  Alert,
  Box,
  Button,
  Chip,
  LinearProgress,
  Snackbar,
  SnackbarOrigin,
  Stack,
  Typography,
  linearProgressClasses,
  styled,
} from "@mui/material";
import { Cancel, Check } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    borderRadius: 5,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
  },
}));

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "product_name",
    headerName: "Product Name",
    width: 150,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 110,
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    width: 110,
    editable: true,
    renderCell: ({ value }) => {
      return <Chip label={value} variant="filled" />;
    },
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    width: 110,
    editable: true,
  },
  {
    field: "created_at",
    headerName: "Added",
    width: 110,
    editable: true,
  },
  {
    field: "is_featured",
    headerName: "Is Featured?",
    width: 110,
    editable: true,
    renderCell: ({ value }) => {
      return value === 1 ? (
        <Check color="success" />
      ) : (
        <Cancel color="warning" />
      );
    },
  },
  {
    field: "stock_quantity",
    headerName: "Stock",
    type: "number",
    width: 110,
    editable: true,
    renderCell: ({ value }) => {
      return (
        <Stack sx={{ width: "100%" }} spacing={1}>
          <BorderLinearProgress
            variant="determinate"
            value={value}
            color={
              value < 10
                ? "error"
                : value >= 10 && value < 50
                ? "warning"
                : value >= 50 && value < 75
                ? "info"
                : "success"
            }
          />
          {value === 0 ? (
            <Typography textAlign={"center"}>Out of stock</Typography>
          ) : (
            <Typography
              textAlign={"center"}
              variant="caption"
              component={"span"}
            >
              {value} in stock
            </Typography>
          )}
        </Stack>
      );
    },
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    width: 110,
    editable: true,
  },
  {
    field: "id",
    headerName: "",
    width: 110,
    editable: true,
    renderCell: ({ value }) => {
      return (
        <LoadingButtonButton onClick={() => handleProductDeletion()}>
          Delete
        </LoadingButtonButton>
      );
    },
  },
];

export type RowType = {
  product_id: number;
  manufacturer: string;
  category: string;
  created_at: string;
  updated_at: string;
  description: string;
  price: string;
  product_name: string;
  stock_quantity: string;
  is_featured: number;
};

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function DataGridDemo() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { updateUserInfo } = useContext(UserContext);

  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const showSuccessMessage = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const { mutateAsync: deleteProduct } = useMutation({
    mutationFn: ProductService.deleteProduct,
    onSuccess: () => {
      showSuccessMessage();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleProductDeletion = (id: number) => {
    deleteProduct(id);
  };

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });

  const {
    data: rows,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.getProducts(paginationModel.page),
  });

  if (isSuccess) {
    console.log(rows);
  }
  if (isError) {
    console.log(error);
    updateUserInfo(null);
    navigate("/login");
  }

  if (isLoading) {
    return <SpinnerOfDoom />;
  }

  return (
    <>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rowCount={10000}
        pagination
        rows={rows}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        sx={{
          "& .MuiDataGrid-filterForm": {
            borderRadius: 10,
          },
        }}
      />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        autoHideDuration={2000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product deleted successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
