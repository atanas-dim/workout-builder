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
  // FitnessCenter as ExercisesIcon,
} from "@mui/icons-material";
import ArmFlexIcon from "../icons/ArmFlexIcon";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "fixed",
    left: 16,
    right: 16,
    // bottom: 16,
    borderRadius: 999,
    width: "max-content",
    margin: "auto",
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
    if (ROUTE_SETTINGS[pathname as RouterPath]?.bottomNavValue)
      setBottomNavValue(ROUTE_SETTINGS[pathname as RouterPath].bottomNavValue);
  }, [pathname]);

  const onBottomNavClick = (e: any, path: string) => {
    push(path);
  };

  return (
    <Paper
      square
      elevation={1}
      className={classes.root}
      sx={{ bottom: isStandalone ? 24 : 16 }}
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
  );
}
