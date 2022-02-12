import React, { useEffect, useState, MouseEvent } from "react";
import { useRouter } from "next/router";

import { isStandaloneOnMobileSafari } from "../../utilities/pwaHelpers/checkStandaloneMode";

import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  ButtonBase,
} from "@mui/material/";
import {
  ListAlt as WorkoutsIcon,
  FitnessCenter as ExercisesIcon,
} from "@mui/icons-material";
import ArmFlexIcon from "../icons/ArmFlexIcon";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: `solid 1px ${theme.palette.divider}`,
  },
}));

import { RouterPath, ROUTE_VALUES } from "../../pages/_app";

export default function BottomNav() {
  const classes = useStyles();
  const [isStandalone, setIsStandalone] = useState(false);
  const router = useRouter();
  const [bottomNavValue, setBottomNavValue] = useState<number | undefined>(0);

  useEffect(() => {
    if (isStandaloneOnMobileSafari()) setIsStandalone(true);
  }, []);

  useEffect(() => {
    if (ROUTE_VALUES[router.pathname as RouterPath]?.bottomNavValue)
      setBottomNavValue(
        ROUTE_VALUES[router.pathname as RouterPath].bottomNavValue
      );
  }, [router.pathname]);

  const onBottomNavClick = (e: any, path: string) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <Paper square elevation={0} className={classes.root}>
      <ButtonBase
        sx={{
          width: "100%",
          height: "100%",
          pb: isStandalone ? 3.5 : undefined,
        }}
      >
        <BottomNavigation
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
            onClick={(e: MouseEvent) =>
              onBottomNavClick(e, RouterPath.Training)
            }
          />
          <BottomNavigationAction
            disableRipple
            label="Workouts"
            icon={<WorkoutsIcon />}
            component="a"
            onClick={(e: MouseEvent) =>
              onBottomNavClick(e, RouterPath.Workouts)
            }
          />
          <BottomNavigationAction
            disableRipple
            label="Exercises"
            icon={<ExercisesIcon />}
            component="a"
            onClick={(e: MouseEvent) =>
              onBottomNavClick(e, RouterPath.Exercises)
            }
          />
        </BottomNavigation>
      </ButtonBase>
    </Paper>
  );
}
