import React, { useState } from "react";

import { RouterPaths } from "./_app";

import useWorkouts from "../hooks/useWorkouts";

import { CircularProgress, Box } from "@mui/material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import ActionButton from "../components/buttons/ActionButton";
import WorkoutCard from "../components/cards/WorkoutCard";

import { Add as AddIcon } from "@mui/icons-material";

//Using getServerSideProps to authenticate token for private routes
export { getServerSideProps } from "../utilities/ssrHelpers/authInServerSideProps";

export default function Workouts() {
  const { workoutsData, isLoading } = useWorkouts();

  return (
    <MainContentWrapper>
      <ActionButton
        size="large"
        label="Create new workout"
        href={RouterPaths.WorkoutEditor}
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
            workout={workout}
            // deleteWorkout={deleteWorkout}
          />
        );
      })}
    </MainContentWrapper>
  );
}
