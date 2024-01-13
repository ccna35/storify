import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridToolbar,
} from "@mui/x-data-grid";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "../api/products";
import SpinnerOfDoom from "./Spinners/SpinnerOfDoom";
import {
  Alert,
  Chip,
  LinearProgress,
  Snackbar,
  SnackbarOrigin,
  Stack,
  Typography,
  linearProgressClasses,
  styled,
} from "@mui/material";
import { Cancel, Check, Edit, RemoveRedEye } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProductModal from "./Pages/Products/Modals/EditProduct";

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

export default function ProductsGrid() {
  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "product_name",
        headerName: "Product Name",
        width: 150,
        editable: true,
        type: "string",
      },
      {
        field: "price",
        headerName: "Price",
        width: 110,
        editable: true,
        type: "number",
        renderCell: ({ value }) => {
          return "$" + value;
        },
      },
      {
        field: "description",
        headerName: "Description",
        width: 110,
        editable: true,
        type: "string",
      },
      {
        field: "category",
        headerName: "Category",
        width: 110,
        editable: true,
        type: "string",
        renderCell: ({ value }) => {
          return <Chip label={value} variant="filled" />;
        },
      },
      {
        field: "manufacturer",
        headerName: "Manufacturer",
        width: 110,
        editable: true,
        type: "string",
      },
      {
        field: "created_at",
        headerName: "Added",
        width: 110,
        editable: true,
        type: "string",
      },
      {
        field: "is_featured",
        headerName: "Is Featured?",
        width: 110,
        editable: true,
        type: "boolean",
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
                <Typography
                  textAlign={"center"}
                  variant="caption"
                  component={"span"}
                >
                  Out of stock
                </Typography>
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
        type: "string",
      },
      {
        field: "actions",
        headerName: "",
        width: 110,
        editable: true,
        type: "actions",
        getActions: ({ id }) => [
          <GridActionsCellItem
            icon={<RemoveRedEye />}
            label="View"
            showInMenu
          />,
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            showInMenu
            onClick={() => handleOpenEditModal(id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon color="error" />}
            label="Delete"
            sx={{
              color: "red",
            }}
            onClick={() => handleProductDeletion(id)}
            showInMenu
          />,
        ],
      },
    ],
    []
  );

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

  const handleCloseMessage = () => {
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

  // Handle deleting a product
  const handleProductDeletion = (id: GridRowId) => {
    console.log(id);

    deleteProduct(id);
  };

  // Handle product id state and send it to the edit modal
  const [productId, setProductId] = useState<null | GridRowId>(null);

  // Edit modal logic
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleOpenEditModal = (id: GridRowId) => {
    setProductId(id);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  // Data grid logic
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });

  const {
    data: rows,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.getProducts(paginationModel.page),
  });

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
        rows={rows as any}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseMessage}
        key={vertical + horizontal}
        autoHideDuration={2000}
      >
        <Alert
          onClose={handleCloseMessage}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product deleted successfully!
        </Alert>
      </Snackbar>
      {productId && (
        <EditProductModal
          handleClose={handleCloseEditModal}
          open={openEditModal}
          product_id={productId}
        />
      )}
    </>
  );
}
