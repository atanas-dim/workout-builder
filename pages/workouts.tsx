import React, { useState } from "react";

import { RouterPaths } from "./_app";

import useWorkouts from "../hooks/useWorkouts";

import { CircularProgress, Box } from "@mui/material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import AddButton from "../components/buttons/AddButton";
import WorkoutCard from "../components/cards/WorkoutCard";

//Using getServerSideProps to authenticate token for private routes
export { getServerSideProps } from "../utilities/ssrHelpers/authInServerSideProps";

export default function Workouts() {
  const { workoutsData, isLoading } = useWorkouts();

  return (
    <MainContentWrapper>
      <AddButton
        label="Create new workout"
        href={RouterPaths.WorkoutEditor}
        sx={{ mb: 2 }}
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
            workout={workout}
            // deleteWorkout={deleteWorkout}
          />
        );
      })}
    </MainContentWrapper>
  );
}
