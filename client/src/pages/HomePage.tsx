import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import DataGridDemo from "../components/DataGridDemo";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import DepartmentsList from "../components/DepartmentsList";

export default function HomePage() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ marginInline: "auto" }}>
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr 1fr"
          gap={4}
          sx={{ width: "100%", py: 3 }}
        >
          <Box gridColumn="span 1">
            <DepartmentsList />
          </Box>
          <Box gridColumn="span 3">
            <DataGridDemo />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
