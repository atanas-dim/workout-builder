import type { NextPage } from "next";

import React, { FC, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { useRouter } from "next/router";

import { RouterPath } from "../resources/routes";

import { withAuth } from "../context/AuthContext";
import { RoutineGroup } from "../context/WorkoutsContext";

import useWorkouts from "../hooks/useWorkouts";

import { CircularProgress, Box, Typography, Card } from "@mui/material";
import {
  AddCircleOutlineRounded as AddIcon,
  MoreHorizRounded as MoreIcon,
} from "@mui/icons-material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import WorkoutCard from "../components/cards/WorkoutCard";
import IconButtonWithMenu from "../components/buttons/IconButtonWithMenu";
import LargeSwitch from "../components/buttons/LargeSwitch";

const Workouts: NextPage = () => {
  const { workoutsData, isLoading, isSorted, setIsSorted, sortedWorkoutsData } =
    useWorkouts();

  return (
    <>
      <CreateButton />
      <MainContentWrapper>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2, width: "100%" }}
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
          sortedWorkoutsData &&
          Object.keys(sortedWorkoutsData)
            .sort((a, b) =>
              sortedWorkoutsData[a].title < sortedWorkoutsData[b].title ? 1 : -1
            )
            .sort((a, b) =>
              sortedWorkoutsData[a].updated < sortedWorkoutsData[b].updated
                ? 1
                : -1
            )
            .map((key) => {
              return (
                <RoutineContainer
                  key={"routine-" + key}
                  data={sortedWorkoutsData[key]}
                />
              );
            })}

        {!isSorted &&
          workoutsData.map((workout, index) => {
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
          sx={(theme) => ({
            width: "100%",
            opacity: 0.7,
            ml: 1,
          })}
        >
          {data.title}
        </Typography>

        {data.id && (
          <IconButtonWithMenu
            id={data.id}
            icon={<MoreIcon fontSize="small" />}
            menuTitle="Routine"
            menuItems={[
              {
                label: "Edit",
                onClick: () => onEditRoutineClick(data.id),
              },
            ]}
          />
        )}
      </Box>

      {data.workouts.length ? (
        data.workouts.map((workout, index) => {
          return (
            <WorkoutCard
              key={"workout-" + data.id + workout.id}
              index={index}
              workout={workout}
            />
          );
        })
      ) : (
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
      )}
    </>
  );
};

// CREATE BUTTON ON HEADER -----------------------------------

const CreateButton = () => {
  const { push } = useRouter();
  const [headerToolbarElement, setHeaderToolbarElement] =
    useState<HTMLElement | null>();

  useEffect(() => {
    const headerToolbar = document.getElementById("right-controls");
    setHeaderToolbarElement(headerToolbar);
  }, []);

  const onCreateWorkoutClick = () => {
    push(RouterPath.WorkoutEditor);
  };

  const onCreateRoutineClick = () => {
    push(RouterPath.RoutineEditor);
  };

  return headerToolbarElement
    ? ReactDOM.createPortal(
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
        />,
        headerToolbarElement
      )
    : null;
};

export default withAuth(Workouts);
