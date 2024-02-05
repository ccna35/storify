import { Box, Stack, Tooltip, Typography } from "@mui/material";
import CardHeader from "./Cards/CardHeader";
import { DashboardService } from "../../../api/dashboard";
import BasicModal from "../../Modals/Modal";
import { useState } from "react";

type StatusBarProps = {
  tooltip: string;
  totalCount: number;
  status: number;
  backgroundColor: string;
};

const StatusBar = ({
  tooltip,
  totalCount,
  status,
  backgroundColor,
}: StatusBarProps) => {
  const columns = [
    {
      field: "EmpCode",
      headerName: "EmpCode",
      width: 90,
      type: "string",
    },
    {
      field: "EmpName",
      headerName: "EmpName",
      width: 90,
      type: "string",
    },
    {
      field: "EmpNameEn",
      headerName: "EmpNameEn",
      width: 90,
      type: "string",
    },
    {
      field: "EmpTitle",
      headerName: "EmpTitle",
      width: 90,
      type: "string",
    },
  ];

  // Handle modal logic
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack
        component={"div"}
        direction={"row"}
        spacing={4}
        alignItems={"center"}
        justifyContent={"space-between"}
        onClick={handleOpen}
        sx={{ cursor: "pointer" }}
      >
        <Tooltip title={tooltip} arrow placement="top">
          <Box
            sx={{
              width: (status / totalCount) * 100 + "%",
              height: 10,
              backgroundColor,
              borderRadius: "999px",
            }}
          ></Box>
        </Tooltip>
        <Typography color="grey">{status}</Typography>
      </Stack>
      <BasicModal
        open={open}
        handleClose={handleClose}
        columns={columns}
        gridId="EmpCode"
        queryFn={() => DashboardService.getEmployees(tooltip.replace(" ", ""))}
      />
    </>
  );
};

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
        <StatusBar
          tooltip={tooltip}
          status={goodStatus}
          totalCount={totalCount}
          backgroundColor="#01DE9C"
        />
        <StatusBar
          tooltip={"Not " + tooltip}
          status={badStatus}
          totalCount={totalCount}
          backgroundColor="#FF6868"
        />
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
        backgroundColor: "white",
        p: 2,
        boxShadow:
          "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
        borderRadius: "10px",
      }}
    >
      <CardHeader title="Employees Insurance Status" />
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
