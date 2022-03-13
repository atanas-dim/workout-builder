import type { NextPage } from "next";
import React, { ReactNode, useState, useCallback } from "react";
import { useRouter } from "next/router";

import { RouterPath } from "../resources/routes";

import { withAuth } from "../context/AuthContext";

import useRoutines from "../hooks/useRoutines";
import useWorkouts from "../hooks/useWorkouts";

import {
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Add as AddIcon, MoreHoriz as MoreIcon } from "@mui/icons-material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import ActionButton from "../components/buttons/ActionButton";
import WorkoutCard from "../components/cards/WorkoutCard";

const Workouts: NextPage = () => {
  const { workoutsData, isLoading } = useWorkouts();
  const { routinesData } = useRoutines();
  const { push } = useRouter();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMoreClick = (anchorId: string) => {
    setMenuAnchorEl(document.getElementById(anchorId));
  };

  const onEditRoutineClick = (event: React.MouseEvent<HTMLElement>) => {
    //@ts-ignore
    const routineId = menuAnchorEl?.attributes?.["data-routine-id"]?.value;

    if (!routineId) return;
    push({ pathname: RouterPath.RoutineEditor, query: { routineId } });
  };

  const createRoutineTitle = (targetRoutineId: string) => {
    if (!targetRoutineId) return "Unsorted";

    return (
      routinesData.find((routine) => routine.id === targetRoutineId)?.title ||
      "Missing routine..."
    );
  };

  const renderWorkoutsItems = () => {
    const items: ReactNode[] = [];

    workoutsData?.forEach((workout, index) => {
      const currentRoutineId = workout?.routineId;
      const prevRoutineId = workoutsData?.[index - 1]?.routineId;

      const routineTitle = createRoutineTitle(currentRoutineId);

      if (currentRoutineId !== prevRoutineId || index === 0) {
        items.push(
          <Box
            key={"routine-label-" + index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Typography
              component="span"
              variant="overline"
              sx={(theme) => ({
                width: "100%",
                color: theme.palette.grey[400],
                ml: 1,
              })}
            >
              {routineTitle}
            </Typography>

            {currentRoutineId && routineTitle && (
              <>
                <IconButton
                  id={"more-button-" + currentRoutineId}
                  data-routine-id={currentRoutineId}
                  onClick={() =>
                    handleMoreClick("more-button-" + currentRoutineId)
                  }
                >
                  <MoreIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={menuAnchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(menuAnchorEl)}
                  onClose={() => setMenuAnchorEl(null)}
                >
                  <MenuItem onClick={onEditRoutineClick}>Edit routine</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        );
      }

      items.push(
        <WorkoutCard
          key={"workout-" + workout.id}
          index={index}
          workout={workout}
        />
      );
    });

    return items;
  };

  return (
    <>
      <MainContentWrapper>
        <ActionButton
          label="Create new workout"
          href={RouterPath.WorkoutEditor}
          sx={{ mb: 2 }}
          fullWidth
          endIcon={<AddIcon />}
        />
        {isLoading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 300, width: "100%" }}
          >
            <CircularProgress />
          </Box>
        )}

        {renderWorkoutsItems()}
      </MainContentWrapper>
    </>
  );
};

export default withAuth(Workouts);
