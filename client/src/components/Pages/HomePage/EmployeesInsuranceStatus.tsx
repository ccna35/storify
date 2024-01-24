import { Box, Stack, Tooltip, Typography } from "@mui/material";

type InsuranceStatusProps = {
  title: string;
  goodStatus: number;
  badStatus: number;
  totalCount: number;
  tooltip: string;
};

const InsuranceStatus = ({
  title,
  goodStatus,
  badStatus,
  totalCount,
  tooltip,
}: InsuranceStatusProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        alignItems: "center",
        gap: 4,
        gridTemplateColumns: "50px 1fr",
      }}
    >
      <Typography fontWeight={500}>{title}</Typography>
      <Stack spacing={1} flexGrow={1}>
        <Stack
          direction={"row"}
          spacing={4}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Tooltip title={tooltip} arrow placement="top">
            <Box
              sx={{
                width: (goodStatus / totalCount) * 100 + "%",
                height: 10,
                backgroundColor: "#01DE9C",
                borderRadius: "999px",
              }}
            ></Box>
          </Tooltip>
          <Typography color="grey">{goodStatus}</Typography>
        </Stack>

        <Stack
          direction={"row"}
          spacing={4}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Tooltip title={"Not " + tooltip} arrow placement="top">
            <Box
              sx={{
                width: (badStatus / totalCount) * 100 + "%",
                height: 10,
                backgroundColor: "#FF6868",
                borderRadius: "999px",
              }}
            ></Box>
          </Tooltip>
          <Typography color="grey">{badStatus}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

type EmployeesInsuranceStatusProps = {
  data: any;
};

const EmployeesInsuranceStatus = ({ data }: EmployeesInsuranceStatusProps) => {
  // Social Insurance stats
  const insured = data.CountInsured[0].Count;
  const notInsured = data.GetCountNotInsured[0].Count;
  const totalSocialInsurance = insured + notInsured;

  // Medical Insurance stats
  const covered = data.CountCoveredMedical[0].Count;
  const notCovered = data.CountNotCoveredMedical[0].Count;
  const totalMedicalInsurance = covered + notCovered;

  return (
    <Box
      component={"article"}
      sx={{
        // maxWidth: 400,
        backgroundColor: "white",
        p: 2,
        border: "1px solid lighgrey",
        boxShadow:
          "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h6" color="#1790FF" textAlign={"center"} mb={3}>
        Employees Insurance Status
      </Typography>
      <Stack spacing={3}>
        <InsuranceStatus
          title="Social"
          goodStatus={insured}
          badStatus={notInsured}
          totalCount={totalSocialInsurance}
          tooltip="Insured"
        />
        <InsuranceStatus
          title="Medical"
          goodStatus={covered}
          badStatus={notCovered}
          totalCount={totalMedicalInsurance}
          tooltip="Covered"
        />
      </Stack>
    </Box>
  );
};

export default EmployeesInsuranceStatus;
