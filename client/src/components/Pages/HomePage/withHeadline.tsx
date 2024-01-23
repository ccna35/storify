import { Box, Typography } from "@mui/material";
import React, { ComponentType } from "react";

// Define the Higher Order Component
const withHeadline = <P extends object>(
  WrappedComponent: ComponentType<P>,
  headline: string
) => {
  // Return a new functional component
  const WithHeadline: React.FC<P> = (props) => {
    return (
      <Box>
        <Typography variant="h6" component={"h2"} mb={2}>
          {headline}
        </Typography>
        <WrappedComponent {...props} />
      </Box>
    );
  };

  return WithHeadline;
};

export default withHeadline;
