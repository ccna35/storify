import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

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
        const res = await axios.get(
          `http://localhost:8000/products?page=${paginationModel.page}`,
          { signal, withCredentials: true }
        );
        console.log(res.data);
        setStatus("success");
        setRows(res.data);
      } catch (error) {
        console.log(error);
        setStatus("error");
      }
    })();

    return () => {
      // Cancel the request when the component unmounts
      controller.abort();
    };
  }, [paginationModel.page]);

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
