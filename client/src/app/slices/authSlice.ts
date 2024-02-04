import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

type User = {
  UserName: string;
  UserPriv: {
    ERPUserNickName: string;
    ModulesCategoryName: string;
    SystemModuleName: string;
  }[];
  // token: string
};

interface UserState {
  isLoggedIn: boolean;
  UserName: string;
  UserPriv: {
    ERPUserNickName: string;
    ModulesCategoryName: string;
    SystemModuleName: string;
  }[];
}

const initialState: UserState = {
  isLoggedIn: Boolean(localStorage.getItem("isLoggedIn")),
  UserName: localStorage.getItem("UserName")
    ? JSON.parse(localStorage.getItem("UserName") ?? "")
    : "",
  UserPriv: localStorage.getItem("UserPriv")
    ? JSON.parse(localStorage.getItem("UserPriv") ?? "")
    : [],
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
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const userSelector = (state: RootState) => state.authReducer;
export default authSlice.reducer;
