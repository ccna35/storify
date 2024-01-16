import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import PrivateRoutes from "./layouts/PrivateRoutes.tsx";
import { PRIVATE_ROUTES } from "./routes.tsx";
import AuthRoutes from "./layouts/AuthRoutes.tsx";
import SpinnerOfDoom from "./components/Spinners/SpinnerOfDoom.tsx";
import { ErrorPage, Register } from "./pages/index.tsx";
import Login from "./pages/Login.tsx";
import { Suspense } from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { create } from "zustand";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route element={<PrivateRoutes />}>
          {PRIVATE_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={<SpinnerOfDoom />}>
                  {route.element}
                </Suspense>
              }
            />
          ))}
        </Route>
      </Route>
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={
            <Suspense fallback={<SpinnerOfDoom />}>
              <Register />
            </Suspense>
          }
        />
      </Route>
    </>
  )
);

interface ThemeState {
  theme: "light" | "dark";
  switchTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  switchTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));

// Handle data grid search input
interface SearchState {
  value: string;
  handleSearchValue: (newValue: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  value: "",
  handleSearchValue: (newValue) => set(() => ({ value: newValue })),
}));

// Handle data grid tabs => MaterialsRequestStatus
export type MaterialRequestStatusType =
  | "All"
  | "Pending"
  | "Sent"
  | "Issued"
  | "Partially Issued"
  | "Cancelled";

interface MaterialsRequestStatusState {
  tabValue: MaterialRequestStatusType;
  handleMaterialsRequestStatus: (newValue: MaterialRequestStatusType) => void;
}

export const useMaterialRequestStatusStore =
  create<MaterialsRequestStatusState>((set) => ({
    tabValue: "Sent",
    handleMaterialsRequestStatus: (newValue) =>
      set(() => ({ tabValue: newValue })),
  }));

declare module "@mui/material/styles" {
  interface Theme {
    borderRadius: {
      primary: number;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    borderRadius?: {
      primary?: number;
    };
  }
}

const App = () => {
  const { theme: colorTheme } = useThemeStore();
  // A custom theme for this app
  const theme = createTheme({
    borderRadius: {
      primary: 2,
    },
    palette: {
      mode: colorTheme,
      primary: {
        main: "#800f2f",
      },
      secondary: {
        main: "#19857b",
      },
      error: {
        main: red.A400,
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} fallbackElement={<SpinnerOfDoom />} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
