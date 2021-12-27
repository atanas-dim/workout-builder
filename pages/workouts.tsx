import React, { useState } from "react";

import useWorkouts from "../hooks/useWorkouts";

import { CircularProgress, Box } from "@mui/material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import AddButton from "../components/buttons/AddButton";
import CreateWorkoutModal from "../components/modals/CreateWorkoutModal";

//Using getServerSideProps to authenticate token for private routes
export { getServerSideProps } from "../utilities/ssrHelpers/authInServerSideProps";

export default function Workouts() {
  const [showModal, setShowModal] = useState(false);
  const { workoutsData, createWorkout, deleteWorkout, isLoading } =
    useWorkouts();

  return (
    <MainContentWrapper>
      <AddButton
        label="Create new workout"
        onClick={() => setShowModal(true)}
        sx={{ mb: 2 }}
      />
      <CreateWorkoutModal
        showModal={showModal}
        hideModal={() => setShowModal(false)}
        createWorkout={createWorkout}
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

      {workoutsData?.map((workout) => {
        return <p key={workout.title}>{workout.title}</p>;
        // return (
        //   <WorkoutCard
        //     key={workout.id}
        //     workout={workout}
        //     deleteWorkout={deleteWorkout}
        //   />
        // );
      })}
    </MainContentWrapper>
  );
}
