import { HomePage, Profile, Settings } from "./pages";
import NewProduct from "./pages/NewProduct";
import Products from "./pages/Products";

export const PRIVATE_ROUTES = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/workOrder/:id",
    element: <Profile />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/new-product",
    element: <NewProduct />,
  },
];

// export const PUBLIC_ROUTES = [
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
// ];
