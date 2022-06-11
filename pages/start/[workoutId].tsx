import React from "react";
import { NextPage } from "next";

import { useRouter } from "next/router";

import useWorkouts from "../../hooks/useWorkouts";

import MainContentWrapper from "../../components/mainContent/MainContentWrapper";

const Start: NextPage = () => {
  const { query } = useRouter();
  const { workouts } = useWorkouts();
  console.log({ workouts });

  const currentWorkout = workouts.find(
    (workout) => workout.id === query.workoutId
  );

  return <MainContentWrapper>{currentWorkout?.title}</MainContentWrapper>;
};

export default Start;
