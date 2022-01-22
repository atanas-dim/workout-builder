import React, { FC, useState, useEffect, createContext } from "react";

import { Timestamp } from "firebase/firestore";

import {
  createWorkoutInFirestore,
  updateWorkoutInFirestore,
  deleteWorkoutInFirestore,
  getWorkoutsDataFromFirestore,
  getWorkoutByIdFromFirestore,
} from "../pages/api/workoutsApi";

import { useAuth } from "./AuthContext";

export type WorkoutExerciseEntry = {
  draggableId: string;
  id: string;
  reps: number;
  sets: number;
};

export type Workout = {
  id: string;
  title?: string;
  exercises?: WorkoutExerciseEntry[];
  created?: Timestamp;
};
type WorkoutsContextValue = {
  workoutsData: Workout[];
  isLoading: boolean;
  createWorkout: (
    workoutTitle: string,
    exercises?: WorkoutExerciseEntry[] | undefined
  ) => void;
  updateWorkout: (
    workoutId: string,
    workoutTitle: string,
    exercises?: WorkoutExerciseEntry[] | undefined
  ) => void;
  deleteWorkout: (workoutId: string) => void;
  getWorkoutsData: () => Promise<void>;
  getWorkoutById: (workoutId: string) => Promise<Workout>;
};

const INITIAL_STATE = {
  workoutsData: [],
  isLoading: false,
  createWorkout: () => Promise.resolve(),
  updateWorkout: () => Promise.resolve(),
  deleteWorkout: () => Promise.resolve(),
  getWorkoutsData: () => Promise.resolve(undefined),
  getWorkoutById: () => Promise.resolve({ id: "" }),
};

export const WorkoutsContext =
  createContext<WorkoutsContextValue>(INITIAL_STATE);

export const WorkoutsProvider: FC = ({ children }: any) => {
  const { user } = useAuth();
  const [workoutsData, setWorkoutsData] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("updating  workouts data");
  }, [workoutsData]);

  useEffect(() => {
    if (user) getWorkoutsData();
  }, [user]);

  const createWorkout = (
    workoutTitle: string,
    exercises?: WorkoutExerciseEntry[]
  ) => {
    if (!workoutTitle || !user) return;
    createWorkoutInFirestore(user.uid, workoutTitle, exercises);

    getWorkoutsData();
  };

  const updateWorkout = (
    workoutId: string,
    workoutTitle: string,
    exercises?: WorkoutExerciseEntry[]
  ) => {
    if (!user || !workoutId) return;
    updateWorkoutInFirestore(user.uid, workoutId, workoutTitle, exercises);

    getWorkoutsData();
  };

  const deleteWorkout = (workoutId: string) => {
    if (!workoutId || !user) return;
    deleteWorkoutInFirestore(user.uid, workoutId);

    getWorkoutsData();
  };

  const getWorkoutsData = async () => {
    if (!user) return;
    setIsLoading(true);

    const data = await getWorkoutsDataFromFirestore(user.uid);
    if (data) setWorkoutsData(data);
    setIsLoading(false);
  };

  const getWorkoutById = async (workoutId: string) => {
    if (!user || !workoutId) return;

    setIsLoading(true);

    const data = await getWorkoutByIdFromFirestore(user.uid, workoutId);

    setIsLoading(false);
    return data;
  };

  return (
    <WorkoutsContext.Provider
      value={{
        isLoading,
        workoutsData,
        createWorkout,
        updateWorkout,
        deleteWorkout,
        getWorkoutsData,
        getWorkoutById,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};
