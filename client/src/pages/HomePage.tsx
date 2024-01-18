import { Box, Stack, Typography } from "@mui/material";
import Stats from "../components/Pages/HomePage/Stats/Stats";
import Preview from "../components/Pages/HomePage/Previews/Preview";
import CustomerPreview from "../components/Pages/HomePage/Previews/Customer Preview/CustomerPreview";
import RecentInvoices from "../components/Pages/HomePage/Recents/RecentInvoices";
import Cards from "../components/Pages/HomePage/Cards/Cards";
import Formatting from "../components/Pages/HomePage/Charts/LineChart";
import DemoBarChart from "../components/Pages/HomePage/Charts/DemoBarChart";

const HomePage = () => {
  return (
    <Stack direction="column" spacing={4}>
      <Typography variant="h5" component={"h1"} fontWeight={500}>
        Hi, Welcome back 👋
      </Typography>
      {/* <DemoBarCharts /> */}
      <DemoBarChart />
      <Cards />
      <Formatting />
      {/* <Stats /> */}
      <Box
        sx={{
          display: "grid",
          columnGap: 2,
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        <Box
          sx={{
            boxShadow: "0px 5px 15px -3px rgba(0,0,0,0.1)",
            border: "1px solid #e9ecef",
            py: 4,
            px: 3,
            gridColumn: "span 3",
            borderRadius: (theme) => theme.borderRadius.primary,
          }}
          flexGrow={1}
        >
          <Stack direction="row" gap={3} justifyContent="space-between">
            <Preview />
            <Preview />
            <Preview />
          </Stack>
        </Box>
        <CustomerPreview />
      </Box>
      <Box
        sx={{
          display: "grid",
          columnGap: 2,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        <RecentInvoices />
        <RecentInvoices />
      </Box>
    </Stack>
  );
};

export default HomePage;
