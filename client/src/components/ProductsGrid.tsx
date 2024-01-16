import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridFilterItem,
  GridFilterOperator,
  GridLogicOperator,
  GridRowId,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "../api/products";
import SpinnerOfDoom from "./Spinners/SpinnerOfDoom";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  LinearProgress,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Rating,
  RatingProps,
  Select,
  SelectChangeEvent,
  Snackbar,
  SnackbarOrigin,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  linearProgressClasses,
  styled,
} from "@mui/material";
import { Cancel, Check, Edit, RemoveRedEye } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditProductModal from "./Pages/Products/Modals/EditProduct";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import { GridToolbarDensitySelector } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { GridFilterInputValueProps } from "@mui/x-data-grid";
import {
  MaterialRequestStatusType,
  useMaterialRequestStatusStore,
  useSearchStore,
} from "../App";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

// "error" | "default" | "success" | "info" | "warning" | "primary" | "secondary"

// "Sent",
// "Issued",
// "Partially Issued",
// "Cancelled",

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

function CustomToolbar() {
  const {
    data: rows,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.getProducts(),
    // queryFn: () => ProductService.getProducts(paginationModel.page),
  });

  const allCount = rows.length;

  const cancelledCount = rows.filter(
    (item) => item.MaterialsRequestStatus == "Cancelled"
  ).length;

  const sentCount = rows.filter(
    (item) => item.MaterialsRequestStatus == "Sent"
  ).length;

  const issuedCount = rows.filter(
    (item) => item.MaterialsRequestStatus == "Issued"
  ).length;

  const partiallyIssuedCount = rows.filter(
    (item) => item.MaterialsRequestStatus == "Partially Issued"
  ).length;

  const pendingCount = rows.filter(
    (item) => item.MaterialsRequestStatus == "Pending"
  ).length;

  console.log(allCount);
  console.log(sentCount);
  console.log(pendingCount);
  console.log(issuedCount);
  console.log(partiallyIssuedCount);
  console.log(cancelledCount);

  const materialsRequestStatusList: {
    id: number;
    name: MaterialRequestStatusType;
    color:
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info"
      | "success"
      | "warning";
    count: number;
  }[] = [
    {
      id: 1,
      name: "All",
      color: "primary",
      count: allCount,
    },
    {
      id: 2,
      name: "Pending",
      color: "default",
      count: pendingCount,
    },
    {
      id: 3,
      name: "Sent",
      color: "info",
      count: sentCount,
    },
    {
      id: 4,
      name: "Cancelled",
      color: "warning",
      count: cancelledCount,
    },
    {
      id: 5,
      name: "Issued",
      color: "success",
      count: issuedCount,
    },
    {
      id: 6,
      name: "Partially Issued",
      color: "secondary",
      count: partiallyIssuedCount,
    },
  ];

  const { tabValue, handleMaterialsRequestStatus } =
    useMaterialRequestStatusStore();

  const handleTabs = (
    event: React.SyntheticEvent,
    newValue: MaterialRequestStatusType
  ) => {
    handleMaterialsRequestStatus(newValue);
  };

  const [personName, setPersonName] = useState<string[]>([]);

  const handleChangeSelectOption = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { handleSearchValue } = useSearchStore();

  return (
    <GridToolbarContainer
      sx={{
        p: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Tabs
        value={tabValue}
        onChange={handleTabs}
        aria-label="basic tabs example"
        sx={{ borderBottom: "1px solid lightgrey", width: "100%" }}
      >
        {materialsRequestStatusList.map(({ id, color, name, count }) => {
          return (
            <Tab
              key={id}
              value={name}
              label={
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                  <Typography fontWeight={500} textTransform={"capitalize"}>
                    {name}
                  </Typography>
                  <Chip
                    label={count}
                    color={color}
                    variant="outlined"
                    size="small"
                  />
                </Stack>
              }
              disableRipple
            />
          );
        })}
      </Tabs>
      <Stack
        direction={"row"}
        p={2}
        spacing={2}
        alignItems={"stretch"}
        width={"100%"}
      >
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChangeSelectOption}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          hiddenLabel={true}
          onChange={(e) => {
            console.log(e.target.value);
            handleSearchValue(e.target.value);
          }}
        />
        {/* <GridToolbarQuickFilter
          fullWidth
          sx={{
            flexGrow: 1,
            border: "1px solid lightgrey",
            borderRadius: 5,
            pb: 0,
            ".MuiInput-underline": {
              height: "100%",
              padding: "0 1rem",
            },
            ".MuiInput-underline:before": {
              border: "none",
            },
            ".MuiInputBase-root.MuiInput-underline:hover::before": {
              border: "none",
            },
            ".MuiInputBase-root.MuiInput-underline.Mui-focused:after": {
              border: "none",
            },
          }}
        /> */}
        <Box component={"div"} sx={{ alignSelf: "center" }}>
          {/* <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Dashboard
          </Button> */}
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: 0,
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Stack>
    </GridToolbarContainer>
  );
}

export default function ProductsGrid() {
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "idMaterialsRequest",
        headerName: "idMaterialsRequest",
        width: 90,
        type: "number",
      },
      {
        field: "idWorkOrder",
        headerName: "idWorkOrder",
        width: 150,
        editable: true,
        type: "number",
      },
      {
        field: "MaterialsRequestNo",
        headerName: "MaterialsRequestNo",
        width: 110,
        editable: true,
        type: "string",
        // renderCell: ({ value }) => {
        //   return "$" + value;
        // },
      },
      {
        field: "MaterialsRequestStatus",
        headerName: "MaterialsRequestStatus",
        width: 110,
        editable: true,
        type: "string",
        renderCell: ({ value }) => {
          return (
            <Chip
              label={value}
              variant="outlined"
              // color={materialsRequestStatusList[value]?.color || "default"}
              // sx={{
              //   borderColor: value === "Issued" ? "green" : "orange",
              // }}
            />
          );
        },
      },
      {
        field: "SendingMail",
        headerName: "SendingMail",
        width: 110,
        editable: true,
        // type: "string",
        // renderCell: ({ value }) => {
        //   return <Chip label={value} variant="filled" />;
        // },
      },
      {
        field: "MailStatus",
        headerName: "MailStatus",
        width: 110,
        editable: true,
        // type: "string",
      },
      {
        field: "IssueMailStatus",
        headerName: "IssueMailStatus",
        width: 110,
        editable: true,
        // type: "string",
      },
      {
        field: "SentOn",
        headerName: "SentOn",
        width: 110,
        editable: true,
        // type: "boolean",
        // renderCell: ({ value }) => {
        //   return value === 1 ? (
        //     <Check color="success" />
        //   ) : (
        //     <Cancel color="warning" />
        //   );
        // },
      },
      {
        field: "IssuedOn",
        headerName: "IssuedOn",
        // type: "number",
        width: 110,
        editable: true,
        // renderCell: ({ value }) => {
        //   return (
        //     <Stack sx={{ width: "100%" }} spacing={1}>
        //       <BorderLinearProgress
        //         variant="determinate"
        //         value={value}
        //         color={
        //           value < 10
        //             ? "error"
        //             : value >= 10 && value < 50
        //             ? "warning"
        //             : value >= 50 && value < 75
        //             ? "info"
        //             : "success"
        //         }
        //       />
        //       {value === 0 ? (
        //         <Typography
        //           textAlign={"center"}
        //           variant="caption"
        //           component={"span"}
        //         >
        //           Out of stock
        //         </Typography>
        //       ) : (
        //         <Typography
        //           textAlign={"center"}
        //           variant="caption"
        //           component={"span"}
        //         >
        //           {value} in stock
        //         </Typography>
        //       )}
        //     </Stack>
        //   );
        // },
      },
      {
        field: "Flag",
        headerName: "Flag",
        width: 110,
        editable: true,
        // type: "string",
      },
      {
        field: "ActionDate",
        headerName: "ActionDate",
        width: 110,
        editable: true,
        // type: "string",
      },
      {
        field: "ActionID",
        headerName: "ActionID",
        width: 110,
        editable: true,
        // type: "string",
      },
      // {
      //   field: "actions",
      //   headerName: "",
      //   width: 110,
      //   editable: true,
      //   type: "actions",
      //   getActions: ({ id }) => [
      //     <GridActionsCellItem
      //       icon={<RemoveRedEye />}
      //       label="View"
      //       showInMenu
      //     />,
      //     <GridActionsCellItem
      //       icon={<Edit />}
      //       label="Edit"
      //       showInMenu
      //       onClick={() => handleOpenEditModal(id)}
      //     />,
      //     <GridActionsCellItem
      //       icon={<DeleteIcon color="error" />}
      //       label="Delete"
      //       sx={{
      //         color: "red",
      //       }}
      //       onClick={() => handleProductDeletion(id)}
      //       showInMenu
      //     />,
      //   ],
      // },
    ],
    []
  );

  // const columns: GridColDef[] = useMemo(
  //   () => [
  //     { field: "id", headerName: "ID", width: 90 },
  //     {
  //       field: "product_name",
  //       headerName: "Product Name",
  //       width: 150,
  //       editable: true,
  //       type: "string",
  //     },
  //     {
  //       field: "price",
  //       headerName: "Price",
  //       width: 110,
  //       editable: true,
  //       type: "number",
  //       renderCell: ({ value }) => {
  //         return "$" + value;
  //       },
  //     },
  //     {
  //       field: "description",
  //       headerName: "Description",
  //       width: 110,
  //       editable: true,
  //       type: "string",
  //     },
  //     {
  //       field: "category",
  //       headerName: "Category",
  //       width: 110,
  //       editable: true,
  //       type: "string",
  //       renderCell: ({ value }) => {
  //         return <Chip label={value} variant="filled" />;
  //       },
  //     },
  //     {
  //       field: "manufacturer",
  //       headerName: "Manufacturer",
  //       width: 110,
  //       editable: true,
  //       type: "string",
  //     },
  //     {
  //       field: "created_at",
  //       headerName: "Added",
  //       width: 110,
  //       editable: true,
  //       type: "string",
  //     },
  //     {
  //       field: "is_featured",
  //       headerName: "Is Featured?",
  //       width: 110,
  //       editable: true,
  //       type: "boolean",
  //       renderCell: ({ value }) => {
  //         return value === 1 ? (
  //           <Check color="success" />
  //         ) : (
  //           <Cancel color="warning" />
  //         );
  //       },
  //     },
  //     {
  //       field: "stock_quantity",
  //       headerName: "Stock",
  //       type: "number",
  //       width: 110,
  //       editable: true,
  //       renderCell: ({ value }) => {
  //         return (
  //           <Stack sx={{ width: "100%" }} spacing={1}>
  //             <BorderLinearProgress
  //               variant="determinate"
  //               value={value}
  //               color={
  //                 value < 10
  //                   ? "error"
  //                   : value >= 10 && value < 50
  //                   ? "warning"
  //                   : value >= 50 && value < 75
  //                   ? "info"
  //                   : "success"
  //               }
  //             />
  //             {value === 0 ? (
  //               <Typography
  //                 textAlign={"center"}
  //                 variant="caption"
  //                 component={"span"}
  //               >
  //                 Out of stock
  //               </Typography>
  //             ) : (
  //               <Typography
  //                 textAlign={"center"}
  //                 variant="caption"
  //                 component={"span"}
  //               >
  //                 {value} in stock
  //               </Typography>
  //             )}
  //           </Stack>
  //         );
  //       },
  //     },
  //     {
  //       field: "updated_at",
  //       headerName: "Updated At",
  //       width: 110,
  //       editable: true,
  //       type: "string",
  //     },
  //     {
  //       field: "actions",
  //       headerName: "",
  //       width: 110,
  //       editable: true,
  //       type: "actions",
  //       getActions: ({ id }) => [
  //         <GridActionsCellItem
  //           icon={<RemoveRedEye />}
  //           label="View"
  //           showInMenu
  //         />,
  //         <GridActionsCellItem
  //           icon={<Edit />}
  //           label="Edit"
  //           showInMenu
  //           onClick={() => handleOpenEditModal(id)}
  //         />,
  //         <GridActionsCellItem
  //           icon={<DeleteIcon color="error" />}
  //           label="Delete"
  //           sx={{
  //             color: "red",
  //           }}
  //           onClick={() => handleProductDeletion(id)}
  //           showInMenu
  //         />,
  //       ],
  //     },
  //   ],
  //   []
  // );

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
    queryFn: () => ProductService.getProducts(),
    // queryFn: () => ProductService.getProducts(paginationModel.page),
  });

  if (isError) {
    console.log(error);
    updateUserInfo(null);
    navigate("/login");
  }

  const { value } = useSearchStore();
  const { tabValue } = useMaterialRequestStatusStore();

  if (isLoading) {
    return <SpinnerOfDoom />;
  }

  return (
    <>
      <DataGridPro
        slots={{ toolbar: CustomToolbar }}
        rowCount={10000}
        pagination
        rows={rows as any}
        columns={columns}
        loading={isLoading}
        disableRowSelectionOnClick
        // paginationModel={paginationModel}
        // paginationMode="server"
        // onPaginationModelChange={setPaginationModel}
        getRowId={(row) => row.idMaterialsRequest}
        filterModel={{
          items: [
            {
              field: "MaterialsRequestNo",
              operator: "startsWith",
              value: value,
              id: 1,
            },
            {
              field: "MaterialsRequestStatus",
              operator: "equals",
              value: tabValue === "All" ? "" : tabValue,
              id: 2,
            },
          ],
          logicOperator: GridLogicOperator.And,
        }}
        sx={{
          border: "none",
          backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(33, 43, 54)",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          // backgroundImage: "none",
          // overflow: "hidden",
          // position: "relative",
          boxShadow:
            "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
          borderRadius: "16px",
          // zIndex: 0,
          ".MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8f9fa",
          },
        }}
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
