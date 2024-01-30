import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const BasicBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Link component={RouterLink} underline="hover" color="inherit" to="/">
        Dashboard
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name} color="text.primary">
            {name}
          </Typography>
        ) : (
          <Link
            key={name}
            underline="hover"
            component={RouterLink}
            to={routeTo}
          >
            {name}
          </Link>
        );
      })}
      {/* <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography> */}
    </Breadcrumbs>
  );
};

export default BasicBreadcrumbs;
