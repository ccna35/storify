import { query } from "../config/config";
import { ProductFormValues } from "../pages/NewProduct";

type Product = {
  product_name: string;
  description: string;
  price: number;
  stock_quantity: number;
  manufacturer: string;
  category: string;
  is_featured: boolean;
};

const getProducts = async (page: number = 0) => {
  try {
    const res = await query.get(`products?page=${page}`);

    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (data: ProductFormValues) => {
  try {
    const res = await query.post("/products", data);

    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const ProductService = {
  getProducts,
  createProduct,
};
