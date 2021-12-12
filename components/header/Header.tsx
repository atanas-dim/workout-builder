import React, { useEffect, useState, useCallback } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material/";

import { useRouter } from "next/router";
import { ROUTE_VALUES, RouterPaths } from "../../pages/_app";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `solid 1px ${theme.palette.divider}`,
    transition: theme.transitions.create(["height"], {
      duration: theme.transitions.duration.short,
    }),
  },
  toolbar: {
    transition: theme.transitions.create(["height"], {
      duration: theme.transitions.duration.short,
    }),
  },
}));

export default function Header() {
  const classes = useStyles();
  const router = useRouter();

  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  const [previousScrollTop, setPreviousScrollTop] = useState(0);

  useEffect(() => {
    // Adding event listener on mounting
    window.addEventListener("scroll", getScrollDirection);

    // Removing event listener upon unmounting
    return () => window.removeEventListener("scroll", getScrollDirection);
  }, [previousScrollTop]);

  const getScrollDirection = () => {
    const scrollTop = document.documentElement.scrollTop;
    console.log({ scrollTop, previousScrollTop });

    if (scrollTop > previousScrollTop) {
      setHasScrolledUp(true);
    } else {
      setHasScrolledUp(false);
    }
    console.log("setting prev");
    setPreviousScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  return (
    <AppBar
      className={classes.root}
      elevation={0}
      sx={{ height: hasScrolledUp ? 40 : 56 }}
    >
      <Toolbar
        sx={{ minHeight: hasScrolledUp ? 40 : 56 }}
        className={classes.toolbar}
      >
        {router.pathname === RouterPaths.Training ? (
          <img src="/logo.svg" alt="logo" />
        ) : (
          <Typography variant="h6" component="div">
            {ROUTE_VALUES[router.pathname]?.title}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
}
