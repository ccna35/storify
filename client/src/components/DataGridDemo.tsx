import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { query } from "../config/config";

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
  },
  {
    field: "brand",
    headerName: "Brand",
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
  },
  {
    field: "stock_quantity",
    headerName: "Quantity",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "updated_at",
    headerName: "Updated At",
    width: 110,
    editable: true,
  },
];

type RowType = {
  id: number;
  brand: string;
  category: string;
  created_at: string;
  updated_at: string;
  description: string;
  price: string;
  product_name: string;
  stock_quantity: string;
  is_featured: number;
};

export default function DataGridDemo() {
  const navigate = useNavigate();
  const { updateUserInfo } = useContext(UserContext);

  const [rows, setRows] = useState<[] | RowType[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });

  useEffect(() => {
    if (paginationModel.page > 100) return;

    // To help us abort the request when component unmounts
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      setStatus("loading");

      try {
        // const res = await axios.get(
        //   `${API_URL}products?page=${paginationModel.page}`,
        //   { signal, withCredentials: true }
        // );

        const res = await query.get(`products?page=${paginationModel.page}`, {
          signal,
        });

        setStatus("success");
        setRows(res.data);
      } catch (error) {
        console.log(error);
        setStatus("error");
        if (error.response.status !== 200) {
          updateUserInfo(null);
          navigate("/login");
        }
      }
    })();

    return () => {
      // Cancel the request when the component unmounts
      controller.abort();
    };
  }, [navigate, paginationModel.page, updateUserInfo]);

  return (
    <DataGrid
      rowCount={10000}
      pagination
      rows={rows}
      columns={columns}
      loading={status === "loading"}
      disableRowSelectionOnClick
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
    />
  );
}
