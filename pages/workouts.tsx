import type { NextPage } from "next";
import React from "react";

import { RouterPath } from "./_app";

import useWorkouts from "../hooks/useWorkouts";

import { CircularProgress, Box } from "@mui/material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import ActionButton from "../components/buttons/ActionButton";
import WorkoutCard from "../components/cards/WorkoutCard";

import { Add as AddIcon } from "@mui/icons-material";

const Workouts: NextPage = () => {
  const { workoutsData, isLoading } = useWorkouts();

  return (
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

      {workoutsData?.map((workout, index) => {
        return (
          <WorkoutCard
            key={"workout" + index}
            index={index}
            workout={workout}
          />
        );
      })}
    </MainContentWrapper>
  );
};

export default Workouts;
