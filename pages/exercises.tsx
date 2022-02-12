import type { NextPage } from "next";
import React, { useState, useEffect } from "react";

import useExercises from "../hooks/useExercises";

import { CircularProgress, Box } from "@mui/material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import ActionButton from "../components/buttons/ActionButton";
import CreateExerciseModal from "../components/modals/CreateExerciseModal";
import ExerciseCard from "../components/cards/ExerciseCard";

import { Add as AddIcon } from "@mui/icons-material";

const Exercises: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    exercisesData,
    createExercise,
    deleteExercise,
    updateExercise,
    getExerciseById,
    isLoading,
  } = useExercises();
  const [selectedExerciseId, setSelectedExerciseId] = useState("");

  const onEditClick = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
    setSelectedExerciseId("");
  };

  return (
    <MainContentWrapper>
      <ActionButton
        label="Create new exercise"
        onClick={() => setShowModal(true)}
        sx={{ mb: 2 }}
        fullWidth
        endIcon={<AddIcon />}
      />

      <CreateExerciseModal
        showModal={showModal}
        hideModal={hideModal}
        createExercise={createExercise}
        selectedExerciseId={selectedExerciseId}
        getExerciseById={getExerciseById}
        updateExercise={updateExercise}
        deleteExercise={deleteExercise}
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

      {exercisesData?.map((exercise, index) => {
        return (
          <ExerciseCard
            key={exercise.id}
            index={index}
            exercise={exercise}
            onEditClick={onEditClick}
          />
        );
      })}
    </MainContentWrapper>
  );
};

export default Exercises;
