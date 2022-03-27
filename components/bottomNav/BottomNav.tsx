import React, { useEffect, useState, MouseEvent } from "react";
import { useRouter } from "next/router";

import { isStandaloneOnMobileSafari } from "../../utilities/pwaHelpers/checkStandaloneMode";

import { makeStyles } from "@mui/styles";
import { alpha, Theme } from "@mui/material/styles";

import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  ButtonBase,
  Box,
  useScrollTrigger,
} from "@mui/material/";

import {
  ListAltRounded as WorkoutsIcon,
  // FitnessCenter as ExercisesIcon,
} from "@mui/icons-material";
import ArmFlexIcon from "../icons/ArmFlexIcon";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "fixed",
    left: 16,
    right: 16,
    borderRadius: 999,
    width: "max-content",
    margin: "auto",
    zIndex: theme.zIndex.appBar,
    transition: "transform 0.3s ease-in-out",
  },
  bottomNavBg: {
    background: `linear-gradient(transparent, ${alpha(
      theme.palette.background.default,
      0.8
    )})`,
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: 64,
    zIndex: theme.zIndex.appBar,
  },
}));

import { RouterPath, ROUTE_SETTINGS } from "../../resources/routes";

export default function BottomNav() {
  const classes = useStyles();
  const [isStandalone, setIsStandalone] = useState(false);
  const { pathname, push } = useRouter();
  const [bottomNavValue, setBottomNavValue] = useState<number>();

  useEffect(() => {
    if (isStandaloneOnMobileSafari()) setIsStandalone(true);
  }, []);

  useEffect(() => {
    if (ROUTE_SETTINGS[pathname as RouterPath].bottomNavValue !== undefined)
      setBottomNavValue(ROUTE_SETTINGS[pathname as RouterPath].bottomNavValue);
  }, [pathname]);

  const onBottomNavClick = (e: any, path: string) => {
    push(path);
  };

  // SHOW/HIDE bottom nav on scroll
  const scrollTrigger = useScrollTrigger({
    threshold: 100,
  });

  return (
    <>
      <Box className={classes.bottomNavBg} role="presentation" />
      <Paper
        id="bottom-nav-paper"
        square
        elevation={1}
        className={classes.root}
        sx={{
          bottom: isStandalone ? 24 : 16,
          transform: scrollTrigger ? "translateY(150%)" : "translateY(0)",
        }}
      >
        <ButtonBase
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 999,
            pl: 1,
            pr: 1,
          }}
        >
          <BottomNavigation
            id="bottom-nav"
            showLabels
            sx={{ backgroundColor: "transparent", width: "100%" }}
            value={bottomNavValue}
            onChange={(event, newValue) => {
              setBottomNavValue(newValue);
            }}
          >
            <BottomNavigationAction
              disableRipple
              label="Training"
              icon={<ArmFlexIcon />}
              component="a"
              sx={{ m: "0 8px", width: 60 }}
              onClick={(e: MouseEvent) =>
                onBottomNavClick(e, RouterPath.Training)
              }
            />

            <BottomNavigationAction
              disableRipple
              label="Workouts"
              icon={<WorkoutsIcon />}
              component="a"
              sx={{ m: "0 8px", width: 60 }}
              onClick={(e: MouseEvent) =>
                onBottomNavClick(e, RouterPath.Workouts)
              }
            />
          </BottomNavigation>
        </ButtonBase>
      </Paper>
    </>
  );
}
