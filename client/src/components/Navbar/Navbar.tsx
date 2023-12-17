import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../env";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { UserContext } from "../../hooks/UserContext";

export default function Navbar() {
  const { user, updateUserInfo } = useContext(UserContext);

  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleLogout = async () => {
    setStatus("loading");
    try {
      const res = await axios.get(API_URL + "users/logout");
      console.log(res);
      updateUserInfo(null);
      localStorage.removeItem("user");
      setStatus("idle");
      navigate("/login");
    } catch (error) {
      setStatus("error");
    }
  };
  return (
    <Box>
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Container maxWidth="lg" sx={{ marginInline: "auto" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              LOGO
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              {user !== null && (
                <Typography variant="h6" component="div">
                  {user.first_name}
                </Typography>
              )}
              {user !== null && (
                <LoadingButton
                  variant="outlined"
                  color="inherit"
                  loading={status === "loading"}
                  onClick={handleLogout}
                >
                  Logout
                </LoadingButton>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
