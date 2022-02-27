import React, { useEffect, useState, MouseEvent } from "react";
import { useRouter } from "next/router";

import { isStandaloneOnMobileSafari } from "../../utilities/pwaHelpers/checkStandaloneMode";

import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  ButtonBase,
  // Box,
  // Zoom,
  // Fab,
} from "@mui/material/";
import {
  ListAlt as WorkoutsIcon,
  // Add as AddIcon,
  // PlayCircle as PlayIcon,
  // FitnessCenter as ExercisesIcon,
} from "@mui/icons-material";
import ArmFlexIcon from "../icons/ArmFlexIcon";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: `solid 1px ${theme.palette.divider}`,
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

  // const onAddWorkoutClick = () => {
  //   push(RouterPath.WorkoutEditor);
  // };

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
            // sx={{ mr: "28px" }}
            onClick={(e: MouseEvent) =>
              onBottomNavClick(e, RouterPath.Training)
            }
          />

          <BottomNavigationAction
            disableRipple
            label="Workouts"
            icon={<WorkoutsIcon />}
            component="a"
            // sx={{ ml: "28px" }}
            onClick={(e: MouseEvent) =>
              onBottomNavClick(e, RouterPath.Workouts)
            }
          />
        </BottomNavigation>
      </ButtonBase>
      {/* <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: 64,
          height: 64,
          mt: "-32px",
          transform: "translateX(-50%)",
          zIndex: 100,
        }}
      >
        <Zoom in={pathname === RouterPath.Training} timeout={200} unmountOnExit>
          <Fab
            color="primary"
            onClick={() => {}}
            sx={{ position: "absolute", width: 64, height: 64 }}
          >
            <PlayIcon />
          </Fab>
        </Zoom>
        <Zoom in={pathname === RouterPath.Workouts} timeout={200} unmountOnExit>
          <Fab
            color="primary"
            onClick={onAddWorkoutClick}
            sx={{ position: "absolute", width: 64, height: 64 }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </Box> */}
    </Paper>
  );
}
