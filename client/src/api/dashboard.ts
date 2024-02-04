import { AxiosResponse } from "axios";
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
  const res = await query.get("/UsersManagement", {
    params: { State: "Dashboard" },
  });

  return res.data;
};

const getNotifications = async () => {
  const res = await query.get("/NotificationsV2");

  return res.data;
};

const updateChangeRequestStatus = async (data: {
  ChangeRequestStatus: string;
  SelectedID: number;
  type: "Materials" | "Missions";
}): Promise<{ msg: string }> => {
  let res: AxiosResponse<any, any>;
  if (data.type === "Materials") {
    res = await query.put("/MaterialChangeRequests", {
      ChangeRequestStatus: data.ChangeRequestStatus,
      SelectedNo: data.SelectedID,
    });
  } else {
    res = await query.put("/MissionChangeRequests", {
      ChangeRequestStatus: data.ChangeRequestStatus,
      SelectedID: data.SelectedID,
    });
  }

  return res.data;
};

const getUserPrivileges = async () => {
  const res = await query.get("/GetUserPrivilegeOnLogin");
  console.log(res.data.result);

  return res.data.result;
};

const getEmployees = async (status: string) => {
  const res = await query.get("/Get" + status);

  return res.data.NationalIDexpired;
};

export const DashboardService = {
  getDashboard,
  getEmployees,
  getNotifications,
  getUserPrivileges,
  updateChangeRequestStatus,
};
