import React, { FC, useState, useEffect, createContext } from "react";

import {
  Timestamp,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { firestore } from "../firebase/config";

import { useAuth } from "../hooks/useAuth";

export type Exercise = {
  id: string;
  title?: string;
  youTubeUrl?: string;
  created?: Timestamp;
};

type ExercisesContextValue = {
  exercisesData: Exercise[];
  isLoading: boolean;
};

const INITIAL_STATE = {
  exercisesData: [],
  isLoading: false,
};

export const ExercisesContext =
  createContext<ExercisesContextValue>(INITIAL_STATE);

export const ExercisesProvider: FC = ({ children }: any) => {
  const [exercisesData, setExercisesData] = useState<Exercise[]>([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("updating  exercises data");
  }, [exercisesData]);

  useEffect(() => {
    if (user) subscribeToExercisesData();
  }, [user]);

  const exercisesCollectionRef = user
    ? collection(firestore, "users", user.uid, "exercises")
    : undefined;

  const subscribeToExercisesData = async () => {
    if (!exercisesCollectionRef) return;
    setIsLoading(true);

    const exercisesQuery = query(exercisesCollectionRef, orderBy("title"));

    onSnapshot(
      exercisesQuery,
      async (querySnapshot) => {
        const exercises: Exercise[] = [];

        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          exercises.push({ id, ...data });
        });

        setExercisesData(exercises);
      },
      (error) => {
        console.error("Error loading data: ", error);
      }
    );
    setIsLoading(false);
  };

  return (
    <ExercisesContext.Provider
      value={{
        exercisesData,
        isLoading,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};
