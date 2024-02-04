import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App.tsx";
import { Provider } from "react-redux";

import { LicenseInfo } from "@mui/x-license-pro";
import store from "./store/store.ts";
import { SnackbarProvider } from "notistack";

LicenseInfo.setLicenseKey(import.meta.env.VITE_LICENSE_KEY);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </Provider>
);
