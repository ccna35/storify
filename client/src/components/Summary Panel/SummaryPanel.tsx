import { Box } from "@mui/material";
import Card from "./Card/Card";
import {
  DraftIcon,
  OverdueIcon,
  PaidIcon,
  PendingIcon,
  TotalIcon,
} from "./Card/Icons";
import { blue, green, grey, orange, red } from "@mui/material/colors";

const cards = [
  {
    id: 1,
    invoices: 20,
    headline: "Total",
    money: 23434,
    color: blue[200],
    icon: <TotalIcon color={blue[200]} />,
  },
  {
    id: 2,
    invoices: 50,
    headline: "Paid",
    money: 23434,
    color: green[200],
    icon: <PaidIcon color={green[200]} />,
  },
  {
    id: 3,
    invoices: 70,
    headline: "Pending",
    money: 23434,
    color: orange[200],
    icon: <PendingIcon color={orange[200]} />,
  },
  {
    id: 4,
    invoices: 10,
    headline: "Overdue",
    money: 23434,
    color: red[200],
    icon: <OverdueIcon color={red[200]} />,
  },
  {
    id: 5,
    invoices: 30,
    headline: "Draft",
    money: 23434,
    color: grey[200],
    icon: <DraftIcon color={grey[600]} />,
  },
];

export type CardType = (typeof cards)[number];

const SummaryPanel = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${cards.length}, 1fr)`,
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        borderRadius: "16px",
        backgroundColor: "#fff",
      }}
    >
      {cards.map((card) => {
        return <Card key={card.id} cardDetails={card} />;
      })}
    </Box>
  );
};

export default SummaryPanel;
