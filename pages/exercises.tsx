import React, { useState, useEffect } from "react";

import { Typography, CircularProgress, Box } from "@mui/material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import CreateNewButton from "../components/buttons/CreateNewButton";
import CreateExerciseModal from "../components/modals/CreateExerciseModal";
import ExerciseCard from "../components/cards/ExerciseCard";

import { useAuth } from "../context/AuthContext";

import useExercises from "../hooks/useExercises";

//Using getServerSideProps to authenticate token for private routes
export { getServerSideProps } from "../utilities/ssrHelpers/authInServerSideProps";

export default function Exercises() {
  const [showModal, setShowModal] = useState(false);
  const { exercisesData, createExercise, deleteExercise, isLoading } =
    useExercises();

  return (
    <MainContentWrapper>
      <CreateNewButton
        option="exercise"
        onClick={() => setShowModal(true)}
        sx={{ mb: 2 }}
      />
      <CreateExerciseModal
        showModal={showModal}
        hideModal={() => setShowModal(false)}
        createExercise={createExercise}
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

      {exercisesData?.map((exercise) => {
        return (
          <ExerciseCard exercise={exercise} deleteExercise={deleteExercise} />
        );
      })}
    </MainContentWrapper>
  );
}
