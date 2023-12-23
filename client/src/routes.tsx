import { HomePage, Profile, Settings } from "./pages";

export const PRIVATE_ROUTES = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/settings",
    element: <Settings />,
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
