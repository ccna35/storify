import { Typography } from "@mui/material";

const CardHeader = ({ title }: { title: string }) => {
  return (
    <Typography variant="h6" color="#1790FF" textAlign={"center"} mb={3}>
      {title}
    </Typography>
  );
};

export default CardHeader;
