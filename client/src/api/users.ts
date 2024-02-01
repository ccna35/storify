import { query } from "../config/config";
import { ProductFormValues } from "../pages/NewProduct";
import { UserFormValues } from "../pages/Register";

type User = {
  id?: number;
  first_name: string;
  last_name: string;
  user_email: string;
  user_password: string;
  added?: string;
};

const getAllUsers = async (page: number = 0): Promise<User[]> => {
  const res = await query.get(`users?page=${page}`);

  return res.data;
};

const getOneUser = async (id: number): Promise<User[]> => {
  const res = await query.get(`users/${id}`);

  return res.data;
};

const signup = async (
  data: UserFormValues
): Promise<{ message: string; user: User }> => {
  const res = await query.post("/users/signup", data);

  return res.data;
};

const login = async (data: { UserName: string; Password: string }) => {
  const res = await query.post("/UserLogin", data);

  return res.data;
};

const updateUser = async (
  data: UserFormValues
): Promise<{ message: string }> => {
  const res = await query.put(`/users/${data.id}`, data);

  return res.data;
};

export const UserService = {
  signup,
  login,
  getAllUsers,
  getOneUser,
  updateUser,
};
