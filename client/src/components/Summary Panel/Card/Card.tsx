import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Progress from "./Progress";
import { CardType } from "../SummaryPanel";

type CardProps = {
  cardDetails: CardType;
};

const Card = ({ cardDetails }: CardProps) => {
  const { color, headline, icon, invoices, money } = cardDetails;
  return (
    <Stack
      component={"div"}
      direction={"row"}
      spacing={1}
      py={3}
      px={0}
      sx={{
        position: "relative",
        "&:not(:last-child):after": {
          content: '""',
          position: "absolute",
          width: "1px",
          height: "80%",
          borderRight: "1px dashed lightgrey",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
        },
      }}
    >
      <Progress icon={icon} color={color} progress={invoices} />
      <Stack flex={1} gap={0.2}>
        <Typography fontWeight={500}>{headline}</Typography>
        <Typography color={"#adb5bd"} fontSize={14}>
          {invoices} invoices
        </Typography>
        <Typography fontWeight={500}>${money}</Typography>
      </Stack>
    </Stack>
  );
};

export default Card;
