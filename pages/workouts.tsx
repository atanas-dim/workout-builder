import type { NextPage } from "next";
import Link from "next/link";
import React, { FC, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { useRouter } from "next/router";

import { RouterPath } from "../resources/routes";

import { withAuth } from "../context/AuthContext";
import { Workout } from "../context/WorkoutsContext";

import useRoutines from "../hooks/useRoutines";
import useWorkouts from "../hooks/useWorkouts";

import {
  CircularProgress,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Card,
} from "@mui/material";
import {
  AddCircleOutline as AddIcon,
  MoreHoriz as MoreIcon,
} from "@mui/icons-material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";

import WorkoutCard from "../components/cards/WorkoutCard";

import { Timestamp } from "firebase/firestore";

type RoutineGroup = {
  id?: string;
  title: string;
  workouts: Workout[];
  updated: Timestamp;
};

// ToDo: Simplify and separate the code on this file
const Workouts: NextPage = () => {
  const { workoutsData, isLoading, isSorted, setIsSorted } = useWorkouts();
  const { routinesData } = useRoutines();
  const [sortedData, setSortedData] = useState<{
    [key: string]: RoutineGroup;
  }>();

  const getSortedWorkoutsByRoutine = () => {
    const routineGroups: {
      [key: string]: RoutineGroup;
    } = {
      unsorted: {
        id: undefined,
        title: "Unsorted",
        workouts: [],
        updated: Timestamp.fromDate(new Date(0, 0, 0)),
      },
    };

    routinesData.forEach((routine) => {
      routineGroups[routine.id] = {
        id: routine.id,
        title: routine.title,
        workouts: [],
        updated: routine.created,
      };
    });

    workoutsData.forEach((workout) => {
      if (routineGroups?.[workout.routineId]) {
        routineGroups[workout.routineId].workouts.push(workout);
        if (routineGroups[workout.routineId].updated < workout.updated)
          routineGroups[workout.routineId].updated = workout.updated;
      } else if (workout.routineId && !routineGroups?.[workout.routineId]) {
        routineGroups[workout.routineId] = {
          id: workout.routineId,
          title: "Missing routine",
          workouts: [workout],
          updated: workout.updated || workout.created,
        };
      } else if (!workout.routineId) {
        routineGroups.unsorted.workouts.push(workout);
      }
    });
    console.log({ routineGroups });

    return routineGroups;
  };

  useEffect(() => {
    setSortedData(getSortedWorkoutsByRoutine());
  }, [routinesData, workoutsData]);

  return (
    <>
      <AddWorkoutButton />
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
          <Switch
            sx={(theme) => ({
              width: 64,
              height: 32,
              m: theme.spacing(0, 1),
              p: 0,
              ".MuiSwitch-switchBase": { p: "6px" },
              ".Mui-checked": { transform: "translateX(32px) !important" },
              ".MuiSwitch-track": {
                bgcolor: `${theme.palette.grey[600]} !important`,
                borderRadius: 999,
                opacity: "0.3 !important",
              },
              ".MuiSwitch-thumb": { color: "primary.main" },
            })}
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
          sortedData &&
          Object.keys(sortedData)
            .sort((a, b) =>
              sortedData[a].updated < sortedData[b].updated ? 1 : -1
            )
            .map((key) => {
              return (
                <RoutineContainer
                  key={"routine-" + key}
                  data={sortedData[key]}
                />
              );
            })}

        {!isSorted &&
          workoutsData.map((workout, index) => {
            return (
              <WorkoutCard
                key={"workout-" + workout.id}
                index={index}
                workout={workout}
              />
            );
          })}
      </MainContentWrapper>
    </>
  );
};

type RoutineContainerProps = {
  data: RoutineGroup;
};
const RoutineContainer: FC<RoutineContainerProps> = ({ data }) => {
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
            color: theme.palette.grey[400],
            ml: 1,
          })}
        >
          {data.title}
        </Typography>
        <IconButton
          id={"more-button-" + data.id}
          data-routine-id={data.id}
          onClick={() => handleMoreClick("more-button-" + data.id)}
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
      </Box>
      {data.workouts.length ? (
        data.workouts.map((workout, index) => {
          return (
            <WorkoutCard
              key={"workout-" + workout.id}
              index={index}
              workout={workout}
            />
          );
        })
      ) : (
        <Card
          elevation={0}
          sx={{ p: 2, width: "100%", opacity: 0.65, textAlign: "center" }}
        >
          Empty
        </Card>
      )}
    </>
  );
};

const AddWorkoutButton = () => {
  const [headerToolbarElement, setHeaderToolbarElement] =
    useState<HTMLElement | null>();

  useEffect(() => {
    const headerToolbar = document.getElementById("right-controls");
    setHeaderToolbarElement(headerToolbar);
  }, []);

  return headerToolbarElement
    ? ReactDOM.createPortal(
        <Link href={RouterPath.WorkoutEditor} passHref>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Link>,
        headerToolbarElement
      )
    : null;
};

export default withAuth(Workouts);
