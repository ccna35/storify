import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

export default function Navbar() {
  return (
    <Box>
      <AppBar position="static" sx={{ boxShadow: "none", py: 1 }}>
        <Container maxWidth="lg" sx={{ marginInline: "auto" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Storify
          </Typography>
        </Container>
      </AppBar>
    </Box>
  );
}
