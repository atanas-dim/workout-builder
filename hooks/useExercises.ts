import { useState, useEffect, useContext } from "react";

import { ExercisesContext } from "../context/ExercisesContext";

export default function useExercises() {
  const {
    isLoading,
    createExercise,
    updateExercise,
    deleteExercise,
    exercisesData,
    getExercisesData,
    getExerciseById,
  } = useContext(ExercisesContext);

  return {
    isLoading,
    createExercise,
    updateExercise,
    deleteExercise,
    exercisesData,
    getExercisesData,
    getExerciseById,
  };
}
