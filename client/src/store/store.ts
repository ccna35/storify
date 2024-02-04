import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/slices/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    authReducer,
  },
  devTools: true,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
