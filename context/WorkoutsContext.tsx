import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

import {
  addDoc,
  Timestamp,
  collection,
  query,
  orderBy,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { firestore } from "../firebase/config";

import { useAuth } from "../hooks/useAuth";

export type WorkoutExerciseEntry = {
  draggableId: string;
  id: string;
  reps: string | number;
  sets: string | number;
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
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const INITIAL_STATE = {
  workoutsData: [],
  isLoading: false,
  setIsLoading: () => {},
};

export const WorkoutsContext =
  createContext<WorkoutsContextValue>(INITIAL_STATE);

export const WorkoutsProvider: FC = ({ children }: any) => {
  const [workoutsData, setWorkoutsData] = useState<Workout[]>([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("updating  workouts data");
  }, [workoutsData]);

  useEffect(() => {
    if (user) subscribeToWorkoutsData();
  }, [user]);

  const workoutsCollectionRef = user
    ? collection(firestore, "users", user.uid, "workouts")
    : undefined;

  const subscribeToWorkoutsData = async () => {
    if (!workoutsCollectionRef) return;

    const workoutsQuery = query(workoutsCollectionRef, orderBy("title"));

    onSnapshot(
      workoutsQuery,
      async (querySnapshot) => {
        setIsLoading(true);
        const workouts: Workout[] = [];

        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          workouts.push({ id, ...data });
        });

        setWorkoutsData(workouts);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error loading data: ", error);
      }
    );
  };

  return (
    <WorkoutsContext.Provider
      value={{
        workoutsData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};
