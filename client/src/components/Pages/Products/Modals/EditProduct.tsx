import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  Button,
  Checkbox,
  Snackbar,
  SnackbarOrigin,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { ProductService } from "../../../../api/products";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { GridRowId } from "@mui/x-data-grid";
import SpinnerOfDoom from "../../../Spinners/SpinnerOfDoom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../hooks/UserContext";

type EditProductModalProps = {
  open: boolean;
  handleClose: () => void;
  product_id: GridRowId;
};

type ProductFormValues = {
  product_name: string;
  description: string;
  price?: number;
  stock_quantity?: number;
  manufacturer: string;
  category: string;
  is_featured?: boolean;
};

const INITIAL_VALUES: ProductFormValues = {
  product_name: "",
  description: "",
  price: 0,
  stock_quantity: 0,
  manufacturer: "",
  category: "",
  is_featured: false,
};

interface State extends SnackbarOrigin {
  opened: boolean;
}

export default function EditProductModal({
  open,
  handleClose,
  product_id,
}: EditProductModalProps) {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { updateUserInfo } = useContext(UserContext);

  const [state, setState] = useState<State>({
    opened: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, opened } = state;

  const showSuccessMessage = () => {
    setState({ ...state, opened: true });
  };

  const handleCloseSuccessMessage = () => {
    setState({ ...state, opened: false });
  };

  console.log(product_id);

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["product"],
    queryFn: () => ProductService.getOneProduct(product_id as number),
  });

  if (isSuccess) {
    console.log(data);
  }

  if (isError) {
    console.log(error);
  }

  const { mutateAsync: updateProduct, isPending } = useMutation({
    mutationFn: ProductService.updateProduct,
    onSuccess: () => {
      showSuccessMessage();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(error);
      if (error.message === "Request failed with status code 401") {
        updateUserInfo(null);
        navigate("/login");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    // defaultValues: INITIAL_VALUES,
    mode: "onChange",
  });

  const onSubmit = async (data: ProductFormValues) => {
    console.log(data);
    updateProduct({ ...data, id: product_id as number });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          {!data ? (
            <Typography>Loading...</Typography>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack direction="column" spacing={2} py={2}>
                <Stack direction="column" spacing={1}>
                  <TextField
                    defaultValue={data[0].product_name}
                    label="Product name"
                    type="text"
                    {...register("product_name", {
                      required: "This field is required!",
                      validate: {
                        length: (value) => {
                          return (
                            (value.length >= 3 && value.length <= 50) ||
                            "Name must be between 3 and 50 characters"
                          );
                        },
                      },
                    })}
                  />
                  {errors.product_name && (
                    <Alert severity="error">
                      {errors.product_name.message}
                    </Alert>
                  )}
                </Stack>
                <Stack direction="column" spacing={1}>
                  <TextField
                    defaultValue={data[0].description}
                    label="Description"
                    type="text"
                    {...register("description", {
                      required: "This field is required!",
                      validate: {
                        length: (value) => {
                          return (
                            (value.length >= 3 && value.length <= 500) ||
                            "Name must be between 3 and 500 characters"
                          );
                        },
                      },
                    })}
                  />
                  {errors.description && (
                    <Alert severity="error">{errors.description.message}</Alert>
                  )}
                </Stack>
                <Stack direction="column" spacing={1}>
                  <TextField
                    defaultValue={data[0].price}
                    label="Price"
                    type="number"
                    {...register("price", {
                      max: 1000000,
                      validate: {
                        isValid: (value) => {
                          return (
                            (value && value <= 1000000) ||
                            "Price can't be more than $1,000,000"
                          );
                        },
                      },
                    })}
                  />
                  {errors.price && (
                    <Alert severity="error">{errors.price.message}</Alert>
                  )}
                </Stack>
                <Stack direction="column" spacing={1}>
                  <TextField
                    defaultValue={data[0].stock_quantity}
                    label="Stock quantity"
                    type="number"
                    {...register("stock_quantity", {
                      max: 10000,
                      validate: {
                        isValid: (value) => {
                          return (
                            (value && value <= 10000) ||
                            "Stock quantity can't be more than 10,000"
                          );
                        },
                      },
                    })}
                  />
                  {errors.stock_quantity && (
                    <Alert severity="error">
                      {errors.stock_quantity.message}
                    </Alert>
                  )}
                </Stack>
                <Stack direction="column" spacing={1}>
                  <TextField
                    defaultValue={data[0].manufacturer}
                    label="Manufacturer"
                    type="text"
                    {...register("manufacturer", {
                      required: "This field is required!",
                      validate: {
                        isValid: (value) => {
                          return (
                            (value.length >= 2 && value.length <= 20) ||
                            "Value can't be more than 20"
                          );
                        },
                      },
                    })}
                  />
                  {errors.manufacturer && (
                    <Alert severity="error">
                      {errors.manufacturer.message}
                    </Alert>
                  )}
                </Stack>
                <Stack direction="column" spacing={1}>
                  <TextField
                    defaultValue={data[0].category}
                    label="Category"
                    type="text"
                    {...register("category", {
                      required: "This field is required!",
                      validate: {
                        isValid: (value) => {
                          return (
                            (value.length >= 2 && value.length <= 20) ||
                            "Value can't be more than 20"
                          );
                        },
                      },
                    })}
                  />
                  {errors.category && (
                    <Alert severity="error">{errors.category.message}</Alert>
                  )}
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Mark featured?</Typography>
                  <Checkbox
                    size="small"
                    {...register("is_featured")}
                    defaultChecked={data[0].is_featured === 1}
                  />
                </Stack>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  loading={isPending}
                >
                  Update
                </LoadingButton>
              </Stack>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={opened}
        onClose={handleCloseSuccessMessage}
        key={vertical + horizontal}
        autoHideDuration={2000}
      >
        <Alert
          onClose={handleCloseSuccessMessage}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
