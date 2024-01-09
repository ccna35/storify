import { Box, Stack, Typography } from "@mui/material";

type CardProps = {
  headline: string;
  subHeadline: string;
  img: string;
  bgColor: string;
};

const Card = ({ headline, subHeadline, img, bgColor }: CardProps) => {
  return (
    <Box
      component={"article"}
      sx={{
        borderRadius: 5,
        backgroundColor: bgColor,
        padding: "2rem",
      }}
    >
      <Stack spacing={1} alignItems={"center"}>
        <Box
          sx={{
            width: 75,
            height: 75,
          }}
        >
          <img src={img} alt="sales" />
        </Box>
        <Typography variant="h4" component={"h2"} fontWeight={500}>
          {headline}
        </Typography>
        <Typography variant="body1" component={"h3"}>
          {subHeadline}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Card;
