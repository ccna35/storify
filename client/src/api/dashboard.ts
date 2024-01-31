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

  return res.data;
};

const getNotifications = async () => {
  const res = await query.get("/NotificationsV2");
  console.log(res.data);

  return res.data;
};

const getEmployees = async (status: string) => {
  const res = await query.get("/Get" + status);
  console.log(res.data.NationalIDexpired);

  return res.data.NationalIDexpired;
};

export const DashboardService = {
  getDashboard,
  getEmployees,
  getNotifications,
};
