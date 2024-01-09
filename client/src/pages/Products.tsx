import DataGridDemo from "../components/DataGridDemo";
import { Stack } from "@mui/material";
import BasicExampleDataGrid from "../components/DataGrids/BasicExampleDataGrid";

const Products = () => {
  return (
    <Stack direction="column" spacing={4}>
      <DataGridDemo />
      {/* <BasicExampleDataGrid /> */}
    </Stack>
  );
};

export default Products;
