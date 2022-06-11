import { FC } from "react";
import { Box, Container } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(13),

    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
}));

const MainContentWrapper: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" component="main" className={classes.root}>
      {children}
    </Container>
  );
};
export default MainContentWrapper;
