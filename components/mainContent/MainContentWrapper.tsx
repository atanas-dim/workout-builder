import { FC } from "react";
import { Box, Container } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(13),
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
