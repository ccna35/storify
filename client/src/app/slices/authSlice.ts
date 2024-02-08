import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

type User = {
  UserName: string;
  UserPriv: {
    ERPUserNickName: string;
    ModulesCategoryName: string;
    SystemModuleName: string;
  }[];
};

interface UserState {
  isLoggedIn: boolean;
  UserName: string;
  UserPriv: {
    ERPUserNickName: string;
    ModulesCategoryName: string;
    SystemModuleName: string;
  }[];
  isError: boolean;
}

const initialState: UserState = {
  isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")),
  UserName: localStorage.getItem("UserName")
    ? JSON.parse(localStorage.getItem("UserName") ?? "")
    : "",
  UserPriv: localStorage.getItem("UserPriv")
    ? JSON.parse(localStorage.getItem("UserPriv") ?? "")
    : [],
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.UserName = action.payload.UserName;
      state.UserPriv = action.payload.UserPriv;
    },
    clearUser: (state) => {
      state.isLoggedIn = false;
      state.UserName = "";
      state.UserPriv = [];
      localStorage.clear();
    },
    setAppError: (state) => {
      state.isError = true;
    },
    resetAppError: (state) => {
      state.isError = false;
    },
  },
});

export const { setUser, clearUser, setAppError, resetAppError } =
  authSlice.actions;
export const userSelector = (state: RootState) => state.authReducer;
export default authSlice.reducer;
