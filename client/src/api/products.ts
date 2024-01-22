import { GridRowId } from "@mui/x-data-grid";
import { query } from "../config/config";
import { ProductFormValues } from "../pages/NewProduct";

export type Product = {
  product_name: string;
  description: string;
  price: number;
  stock_quantity: number;
  manufacturer: string;
  category: string;
  is_featured: number | boolean;
};

const getProducts = async (page: number = 0) => {
  const res = await query.get("/");
  // const res = await query.get(`products?page=${page}`, { signal });

  // console.log(res.data);

  return res.data.result;
};

const getOneProduct = async (id: number): Promise<Product[]> => {
  const res = await query.get(`products/${id}`);

  return res.data;
};

const createProduct = async (
  data: ProductFormValues
): Promise<{ message: string }> => {
  const res = await query.post("/products", data);

  return res.data;
};

const updateProduct = async (
  data: ProductFormValues
): Promise<{ message: string }> => {
  const res = await query.put(`/products/${data.id}`, data);

  return res.data;
};

const deleteProduct = async (id: GridRowId) => {
  try {
    const res = await query.delete(`/products/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ProductService = {
  getProducts,
  createProduct,
  deleteProduct,
  getOneProduct,
  updateProduct,
};
