import {
  GridColDef,
  GridLogicOperator,
  GridRowId,
  GridToolbarContainer,
  gridFilterModelSelector,
  useGridSelector,
} from "@mui/x-data-grid";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "../api/products";
import SpinnerOfDoom from "./Spinners/SpinnerOfDoom";
import {
  Alert,
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Snackbar,
  SnackbarOrigin,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import EditProductModal from "./Pages/Products/Modals/EditProduct";
import { DataGridPro, useGridApiContext } from "@mui/x-data-grid-pro";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  MaterialRequestStatusType,
  useMaterialRequestStatusStore,
  useSearchStore,
} from "../App";
import { grey } from "@mui/material/colors";

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

const flags = ["True", "False"];

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
  is_featured: boolean;
};

interface State extends SnackbarOrigin {
  open: boolean;
}

type MaterialsRequestStatus = {
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
};

type StatusColor = Partial<MaterialsRequestStatus>;

const statusColors: StatusColor[] = [
  { name: "All", color: "primary" },
  { name: "Pending", color: "default" },
  { name: "Sent", color: "info" },
  { name: "Cancelled", color: "warning" },
  { name: "Issued", color: "success" },
  { name: "Partially Issued", color: "secondary" },
];

const CustomToolbar = () => {
  const apiRef = useGridApiContext();
  const { items, logicOperator } = useGridSelector(
    apiRef,
    gridFilterModelSelector
  );

  console.log(items, logicOperator);

  const { data: rows } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.getProducts(),
    // queryFn: () => ProductService.getProducts(paginationModel.page),
  });

  const allCount = rows.length;

  const getCount = (status: MaterialRequestStatusType) => {
    console.log("Rendered");

    return rows.filter((item) => item.MaterialsRequestStatus == status).length;
  };

  const cancelledCount = useMemo(() => getCount("Cancelled"), []);
  const sentCount = useMemo(() => getCount("Sent"), []);
  const issuedCount = useMemo(() => getCount("Issued"), []);
  const partiallyIssuedCount = useMemo(() => getCount("Partially Issued"), []);

  const pendingCount = useMemo(
    () =>
      rows.filter(
        (item) =>
          item.MaterialsRequestStatus == "Pending" && item.Flag == "True"
      ).length,
    []
  );

  const materialsRequestStatusList: MaterialsRequestStatus[] = [
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

  // Tabs state
  const [tabValue, setTabValue] = useState<MaterialRequestStatusType>("All");

  // Tabs logic
  const handleTabs = (
    event: React.SyntheticEvent,
    newValue: MaterialRequestStatusType
  ) => {
    setTabValue(newValue);
    apiRef.current.upsertFilterItem({
      field: "MaterialsRequestStatus",
      operator: "equals",
      value: newValue === "All" ? "" : newValue,
      id: 2,
    });
  };

  // Search input logic
  const handleSearchInput = (value: string) => {
    apiRef.current.upsertFilterItem({
      field: "MaterialsRequestNo",
      operator: "startsWith",
      value: value,
      id: 1,
    });
  };

  const [personName, setPersonName] = useState<string[]>([]);

  const handleChangeSelectOption = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value },
    } = event;

    console.log(value);

    apiRef.current.upsertFilterItem({
      field: "Flag",
      operator: "isAnyOf",
      value: value,
      id: 3,
    });

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
          <InputLabel id="demo-multiple-checkbox-label">Flag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChangeSelectOption}
            input={<OutlinedInput label="Flag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {flags.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Material Request Number"
          variant="outlined"
          hiddenLabel={true}
          onChange={(e) => {
            console.log(e.target.value);
            handleSearchInput(e.target.value);
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
};

export default function MaterialsRequestGrid() {
  // const [tabValue, setTabValue] = useState<MaterialRequestStatusType>("Sent");

  // const handleTabs = (
  //   event: React.SyntheticEvent,
  //   newValue: MaterialRequestStatusType
  // ) => {
  //   setTabValue(newValue);
  // };

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

        type: "number",
      },
      {
        field: "MaterialsRequestNo",
        headerName: "MaterialsRequestNo",
        width: 110,

        type: "string",
        // renderCell: ({ value }) => {
        //   return "$" + value;
        // },
      },
      {
        field: "MaterialsRequestStatus",
        headerName: "MaterialsRequestStatus",
        width: 110,

        type: "string",
        renderCell: ({ value }) => {
          return (
            <Chip
              label={value}
              variant="outlined"
              color={
                statusColors.filter((status) => status.name == value)[0].color
              }
              // sx={{
              //   backgroundColor: "lightgray",
              // }}
            />
          );
        },
      },
      {
        field: "SendingMail",
        headerName: "SendingMail",
        width: 110,

        // type: "string",
        // renderCell: ({ value }) => {
        //   return <Chip label={value} variant="filled" />;
        // },
      },
      {
        field: "MailStatus",
        headerName: "MailStatus",
        width: 110,
        // type: "string",
      },
      {
        field: "IssueMailStatus",
        headerName: "IssueMailStatus",
        width: 110,
        // type: "string",
      },
      {
        field: "SentOn",
        headerName: "SentOn",
        width: 110,
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

        // type: "string",
      },
      {
        field: "ActionDate",
        headerName: "ActionDate",
        width: 110,

        // type: "string",
      },
      {
        field: "ActionID",
        headerName: "ActionID",
        width: 110,

        // type: "string",
      },
      // {
      //   field: "actions",
      //   headerName: "",
      //   width: 110,
      //
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
        getRowId={(row) => row.idMaterialsRequest}
        sx={{
          border: "none",
          backgroundColor: "rgb(255, 255, 255)",
          color: "rgb(33, 43, 54)",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          boxShadow:
            "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
          borderRadius: "16px",
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
