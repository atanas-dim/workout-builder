import React, { useEffect, useState, MouseEvent } from "react";
import { useRouter } from "next/router";

import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material/";
import {
  ListAlt as WorkoutsIcon,
  FitnessCenter as ExercisesIcon,
} from "@mui/icons-material";
import ArmFlexIcon from "../icons/ArmFlexIcon";

import { RouterPaths, ROUTE_VALUES } from "../../pages/_app";

export default function BottomNav() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const router = useRouter();
  const [value, setValue] = useState<number | undefined>(0);

  useEffect(() => {
    dynamicallyImportReactDeviceDetect();
    if (ROUTE_VALUES[router.pathname]?.bottomNavValue)
      setValue(ROUTE_VALUES[router.pathname].bottomNavValue);
  }, [router.pathname]);

  const dynamicallyImportReactDeviceDetect = async () => {
    const { isMobile } = await import("react-device-detect");
    setIsMobileDevice(isMobile);
  };

  const onBottomNavClick = (e: any, path: string) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <Paper
      square
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: isMobileDevice ? 1 : undefined,
      }}
      elevation={4}
    >
      <BottomNavigation
        showLabels
        sx={{ backgroundColor: "transparent" }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Training"
          icon={<ArmFlexIcon />}
          component="a"
          onClick={(e: MouseEvent) => onBottomNavClick(e, RouterPaths.Training)}
        />
        <BottomNavigationAction
          label="Workouts"
          icon={<WorkoutsIcon />}
          component="a"
          onClick={(e: MouseEvent) => onBottomNavClick(e, RouterPaths.Workouts)}
        />
        <BottomNavigationAction
          label="Exercises"
          icon={<ExercisesIcon />}
          component="a"
          onClick={(e: MouseEvent) =>
            onBottomNavClick(e, RouterPaths.Exercises)
          }
        />
      </BottomNavigation>
    </Paper>
  );
}
