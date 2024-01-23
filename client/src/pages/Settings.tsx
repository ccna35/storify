import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Settings() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Typography>Settings page</Typography>
      <Link component={RouterLink} to="/settings/user">
        User settings
      </Link>
    </Box>
  );
}
