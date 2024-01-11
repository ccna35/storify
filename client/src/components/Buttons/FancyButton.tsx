import { Button } from "@mui/material";

const FancyButton = () => {
  return (
    <Button
      variant="outlined"
      disableElevation
      disableFocusRipple
      disableRipple
      color="secondary"
    >
      Fancy Button
    </Button>
  );
};

export default FancyButton;
