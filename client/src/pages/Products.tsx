import { Stack } from "@mui/material";
import BasicExampleDataGrid from "../components/DataGrids/BasicExampleDataGrid";
import ProductsGrid from "../components/ProductsGrid";
import "./products.css";

const Products = () => {
  return (
    <Stack direction="column" spacing={4}>
      <ProductsGrid />
      {/* <BasicExampleDataGrid /> */}
    </Stack>
  );
};

export default Products;
