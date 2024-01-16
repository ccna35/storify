import { Stack } from "@mui/material";
import ProductsGrid from "../components/ProductsGrid";
import "./products.css";
import SummaryPanel from "../components/Summary Panel/SummaryPanel";

const Products = () => {
  return (
    <Stack direction="column" spacing={4}>
      <SummaryPanel />
      <ProductsGrid />
    </Stack>
  );
};

export default Products;
