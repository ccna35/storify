import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App.tsx";

import { LicenseInfo } from "@mui/x-license-pro";

LicenseInfo.setLicenseKey(import.meta.env.VITE_LICENSE_KEY);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
