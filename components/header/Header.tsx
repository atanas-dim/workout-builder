import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material/";

import { useRouter } from "next/router";
import { ROUTE_VALUES } from "../../pages/_app";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: "center",
    borderBottom: `solid 1px ${theme.palette.divider}`,
  },
}));

export default function Header() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <AppBar className={classes.root} elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div">
          {ROUTE_VALUES[router.pathname]?.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
