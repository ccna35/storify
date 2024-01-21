import { query } from "../config/config";

export type Product = {
  product_name: string;
  description: string;
  price: number;
  stock_quantity: number;
  manufacturer: string;
  category: string;
  is_featured: number | boolean;
};

const getDashboard = async () => {
  const res = await query.get("/GetDashboard");

  console.log(res.data);

  return res.data;
};

export const DashboardService = {
  getDashboard,
};
