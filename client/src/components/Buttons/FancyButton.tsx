import { Button } from "@mui/material";

const FancyButton = () => {
  return (
    <Button
      variant="outlined"
      disableElevation
      disableFocusRipple
      disableRipple
<<<<<<< HEAD
      color="secondary"
      sx={{
        border: (theme) => `2px solid ${theme.palette.primary}`,
      }}
=======
      color="primary"
>>>>>>> origin/main
    >
      Fancy Button
    </Button>
  );
};

export default FancyButton;
