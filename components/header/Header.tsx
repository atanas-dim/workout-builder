import React from "react";

import { AppBar, Toolbar, Typography } from "@mui/material/";

import { useRouter } from "next/router";

import { ROUTE_VALUES } from "../../pages/_app";

export default function Header() {
  const router = useRouter();

  return (
    <AppBar sx={{ alignItems: "center" }}>
      <Toolbar>
        <Typography variant="h6" color="inherit" component="div">
          {ROUTE_VALUES[router.pathname]?.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
