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

const createMission = async () => {
  const data = {
    WorkOrders: [
      {
        id: 13375,
        WorkOrderNo: "WO006NO02285",
        WorkOrderDate: "2024-Jan-03",
        SiteName: "SiteName -3112",
        SiteCode: "SiteCode -3112",
        RequestorsName: "Requestor - 34",
        ERPUserNickName: "ERPUser Nick Name - 6",
        WorkOrderStatus: "In Progress",
        WorkOrderDiscription: "WorkOrder - WO006NO02285 - Description ",
      },
    ],
    Employees: [
      { id: 0, idEmpInfo: 4, EmpName: "Emp Name - 4", EmpTitle: "Technician" },
      { id: 1, idEmpInfo: 5, EmpName: "Emp Name - 5", EmpTitle: "Driver-3" },
    ],
    Cars: [
      {
        id: 0,
        idEmpInfoCars: 235,
        CarsNumber: "Car Number- 126",
        CarsType: "ملاكي",
        AssignmentDateStart: "2019-01-01T08:00:00.000Z",
        AssignmentDateEnd: "2024-12-31T23:59:00.000Z",
        EmpName: "Emp Name - 958",
        EmpTitle: "Not Avilable",
        idCarsInfoCarsNumbers: 122,
      },
      {
        id: 1,
        idEmpInfoCars: 297,
        CarsNumber: "Car Number- 133",
        CarsType: "أيجار",
        AssignmentDateStart: "2020-08-05T08:00:00.000Z",
        AssignmentDateEnd: "2024-12-31T23:59:00.000Z",
        EmpName: "Emp Name - 977",
        EmpTitle: "Driver-2",
        idCarsInfoCarsNumbers: 129,
      },
    ],
    MissionDescription: "",
    MissionStart: "2024-02-01 8:00:00",
  };
  const res = await query.post("/Missions", data);

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

export const MissionsService = {
  createMission,
};
