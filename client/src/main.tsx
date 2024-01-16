import ReactDOM from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App.tsx";

import { LicenseInfo } from "@mui/x-license-pro";

LicenseInfo.setLicenseKey(
  "fa2cb00ddbab343d055a47f7d4fbf0a1Tz03MzM1NyxFPTE3MjQ0OTkxMDcwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
