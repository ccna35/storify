import { Box, Grid } from "@mui/material";
import Card from "./Card";

const IMG_PATH = "./homepage/cards/";

const cards = [
  {
    id: 1,
    headline: "714k",
    subHeadline: "Weekly Sales",
    img: IMG_PATH + "sales.png",
    bgColor: "#D4F3E6",
  },
  {
    id: 2,
    headline: "1.35m",
    subHeadline: "New Users",
    img: IMG_PATH + "users.png",
    bgColor: "#D6F7FA",
  },
  {
    id: 3,
    headline: "1.72m",
    subHeadline: "Item Orders",
    img: IMG_PATH + "orders.png",
    bgColor: "#FFF5DC",
  },
  {
    id: 4,
    headline: "234",
    subHeadline: "Bug Reports",
    img: IMG_PATH + "bugs.png",
    bgColor: "#FFE7DF",
  },
];

const Cards = () => {
  return (
    <Box
      sx={{
        display: "grid",
        columnGap: 2,
        gridTemplateColumns: "repeat(4, 1fr)",
      }}
    >
      {cards.map(({ id, headline, subHeadline, img, bgColor }) => {
        return (
          <Card
            key={id}
            headline={headline}
            subHeadline={subHeadline}
            img={img}
            bgColor={bgColor}
          />
        );
      })}
    </Box>
  );
};

export default Cards;
