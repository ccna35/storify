import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./theme.tsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
// import Register from "./pages/Register.tsx";
// import ErrorPage from "./pages/ErrorPage.tsx";
// import Login from "./pages/Login.tsx";
import PrivateRoutes from "./layouts/PrivateRoutes.tsx";
import { PRIVATE_ROUTES } from "./routes.tsx";
import AuthRoutes from "./layouts/AuthRoutes.tsx";
import SpinnerOfDoom from "./components/Spinners/SpinnerOfDoom.tsx";
import { ErrorPage, Register } from "./pages/index.tsx";
import Login from "./pages/Login.tsx";
import { Suspense } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route element={<PrivateRoutes />}>
        {PRIVATE_ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Suspense fallback={<SpinnerOfDoom />}>{route.element}</Suspense>
            }
          />
        ))}
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
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} fallbackElement={<SpinnerOfDoom />} />
  </ThemeProvider>
);
