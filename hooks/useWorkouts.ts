import { useContext } from "react";

import { WorkoutsContext } from "../context/WorkoutsContext";

export default function useWorkouts() {
  const {
    isLoading,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    workoutsData,
    getWorkoutsData,
    getWorkoutById,
  } = useContext(WorkoutsContext);

  return {
    isLoading,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    workoutsData,
    getWorkoutsData,
    getWorkoutById,
  };
}
