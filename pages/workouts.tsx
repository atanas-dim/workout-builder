import React, { FC } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";

import { RouterPath } from "../resources/routes";

import { withPrivate } from "../context/AuthContext";
import { RoutineGroup } from "../context/WorkoutsContext";

import useWorkouts from "../hooks/useWorkouts";

import {
  CircularProgress,
  Box,
  Typography,
  Card,
  Fade,
  Portal,
} from "@mui/material";
import {
  AddCircleOutlineRounded as AddIcon,
  MoreHorizRounded as MoreIcon,
} from "@mui/icons-material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import WorkoutCard from "../components/workouts/WorkoutCard";
import IconButtonWithMenu from "../components/buttons/IconButtonWithMenu";
import IconButtonWithDrawer from "../components/buttons/IconButtonWithDrawer";
import LargeSwitch from "../components/buttons/LargeSwitch";
import ActionButton from "../components/buttons/ActionButton";

const Workouts: NextPage = () => {
  const { workouts, isLoading, isSorted, setIsSorted, routineGroups } =
    useWorkouts();

  const routinesOrderedByUpdated = Object.keys(routineGroups).sort((a, b) =>
    routineGroups[a].updated < routineGroups[b].updated ? 1 : -1
  );

  return (
    <>
      <CreateButton />
      <MainContentWrapper>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 1, width: "100%" }}
        >
          <Typography
            component="span"
            variant="overline"
            noWrap
            align="right"
            sx={{ flex: 1 }}
          >
            by Title
          </Typography>

          <LargeSwitch
            checked={isSorted}
            onChange={() => setIsSorted((prev) => !prev)}
          />

          <Typography
            component="span"
            variant="overline"
            noWrap
            align="left"
            sx={{ flex: 1 }}
          >
            by Routine
          </Typography>
        </Box>

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

        {isSorted &&
          routineGroups &&
          routinesOrderedByUpdated.map((key) => {
            if (
              key === "unsorted" &&
              !Object.keys(routineGroups[key].workouts).length
            )
              return;
            else
              return (
                <RoutineContainer
                  key={"routine-" + key}
                  data={routineGroups[key]}
                />
              );
          })}

        {!isSorted &&
          workouts.map((workout, index) => {
            return (
              <WorkoutCard
                key={"workout-card-" + index}
                index={index}
                workout={workout}
              />
            );
          })}
      </MainContentWrapper>
    </>
  );
};

// ROUTINE GROUP -----------------------------------
type RoutineContainerProps = {
  data: RoutineGroup;
};

const RoutineContainer: FC<RoutineContainerProps> = ({ data }) => {
  const { push } = useRouter();

  const onEditRoutineClick = (routineId?: string) => {
    if (!routineId) return;
    push({ pathname: RouterPath.RoutineEditor, query: { routineId } });
  };

  return (
    <>
      <Box
        key={"routine-label-" + data.id}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography
          component="span"
          variant="overline"
          sx={{
            width: "100%",
            opacity: 0.7,
            ml: 1,
          }}
        >
          {data.title}
        </Typography>

        <IconButtonWithDrawer
          icon={<MoreIcon fontSize="small" />}
          drawerHeading={data.title}
        >
          <ActionButton
            label="Edit routine"
            onClick={() => onEditRoutineClick(data.id)}
          />
        </IconButtonWithDrawer>
      </Box>

      {Object.keys(data.workouts).length ? (
        Object.keys(data.workouts).map((key, index) => {
          const workout = data.workouts[key];

          return (
            <WorkoutCard
              key={"workout-" + data.id + workout.id + index}
              index={index}
              workout={workout}
              isLast={index === Object.keys(data.workouts).length - 1}
            />
          );
        })
      ) : (
        <Fade
          in={!Object.keys(data.workouts).length}
          appear={!Object.keys(data.workouts).length}
          timeout={600}
        >
          <Card
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              width: "100%",
              opacity: 0.65,
              textAlign: "center",
            }}
          >
            Empty
          </Card>
        </Fade>
      )}
    </>
  );
};

// CREATE BUTTON ON HEADER -----------------------------------
const CreateButton = () => {
  const { push } = useRouter();

  const onCreateWorkoutClick = () => {
    push(RouterPath.WorkoutEditor);
  };

  const onCreateRoutineClick = () => {
    push(RouterPath.RoutineEditor);
  };

  return (
    <Portal container={document.getElementById("right-controls")}>
      <IconButtonWithMenu
        id="create-new"
        icon={<AddIcon />}
        menuTitle="Create"
        menuItems={[
          {
            label: "Workout",
            onClick: onCreateWorkoutClick,
          },
          {
            label: "Routine",
            onClick: onCreateRoutineClick,
          },
        ]}
      />
    </Portal>
  );
};

export default withPrivate(Workouts);
