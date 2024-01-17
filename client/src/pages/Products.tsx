import { Stack } from "@mui/material";
import "./products.css";
import SummaryPanel from "../components/Summary Panel/SummaryPanel";
import MaterialsRequestGrid from "../components/Grid/ProductsGrid";

const Products = () => {
  return (
    <Stack direction="column" spacing={4}>
      <SummaryPanel />
      <MaterialsRequestGrid />
    </Stack>
  );
};

export default Products;
