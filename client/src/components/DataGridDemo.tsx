import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { query } from "../config/config";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../api";
import SpinnerOfDoom from "./Spinners/SpinnerOfDoom";

const columns: GridColDef[] = [
  { field: "product_id", headerName: "ID", width: 90 },
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

export default function DataGridDemo() {
  const navigate = useNavigate();
  const { updateUserInfo } = useContext(UserContext);

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

  // useEffect(() => {
  //   if (paginationModel.page > 100) return;

  //   // To help us abort the request when component unmounts
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   (async () => {
  //     setStatus("loading");

  //     try {
  //       const res = await query.get(`products?page=${paginationModel.page}`, {
  //         signal,
  //       });

  //       setStatus("success");
  //       setRows(res.data);
  //     } catch (error) {
  //       console.log(error);  //       setStatus("error");
  //       if (error.response.status !== 200) {
  //         updateUserInfo(null);
  //         navigate("/login");
  //       }
  //     }
  //   })();

  //   return () => {
  //     // Cancel the request when the component unmounts
  //     controller.abort();
  //   };
  // }, [navigate, paginationModel.page, updateUserInfo]);

  // return <h1>hello</h1>;

  if (isLoading) {
    return <SpinnerOfDoom />;
  }

  return (
    <DataGrid
      rowCount={10000}
      pagination
      rows={rows}
      columns={columns}
      loading={isLoading}
      disableRowSelectionOnClick
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
    />
  );
}
