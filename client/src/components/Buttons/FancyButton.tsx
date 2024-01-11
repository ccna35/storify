import { Button } from "@mui/material";

const FancyButton = () => {
  return (
    <Button
      variant="contained"
      disableElevation
      disableFocusRipple
      disableRipple
      color="secondary"
      sx={{
        border: (theme) => `2px solid ${theme.palette.primary}`,
      }}
    >
      Fancy Button
    </Button>
  );
};

export default FancyButton;
