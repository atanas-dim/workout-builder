import React, {
  FC,
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

import {
  Timestamp,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { firestore } from "../firebase/config";

import { useAuth } from "../hooks/useAuth";

export type WorkoutExerciseEntry = {
  id: string;
  name: string;
  reps: string;
  sets: string;
  videoUrl: string;
};

export type Workout = {
  id: string;
  routineId: string;
  indexInRoutine: string;
  title: string;
  exercises: WorkoutExerciseEntry[];
  created: Timestamp;
  updated: Timestamp;
};

type WorkoutsContextValue = {
  workoutsData: Workout[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isSorted: boolean;
  setIsSorted: Dispatch<SetStateAction<boolean>>;
};

const INITIAL_STATE = {
  workoutsData: [],
  isLoading: false,
  setIsLoading: () => {},
  isSorted: true,
  setIsSorted: () => {},
};

export const WorkoutsContext =
  createContext<WorkoutsContextValue>(INITIAL_STATE);

export const WorkoutsProvider: FC = ({ children }: any) => {
  const [isSorted, setIsSorted] = useState(INITIAL_STATE.isSorted);
  const [workoutsData, setWorkoutsData] = useState<Workout[]>([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("updating  workouts data");
  }, [workoutsData]);

  useEffect(() => {
    if (!user) return;
    subscribeToWorkoutsData();
  }, [user, isSorted]);

  const workoutsCollectionRef = user
    ? collection(firestore, "users", user.uid, "workouts")
    : undefined;

  const subscribeToWorkoutsData = async () => {
    if (!workoutsCollectionRef) return;

    const workoutsQuery = isSorted
      ? query(
          workoutsCollectionRef,
          orderBy("routineId", "desc"),
          orderBy("indexInRoutine")
        )
      : query(workoutsCollectionRef, orderBy("title"));

    onSnapshot(
      workoutsQuery,
      async (querySnapshot) => {
        setIsLoading(true);
        const workouts: Workout[] = [];

        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          const {
            title,
            exercises,
            created,
            updated,
            routineId,
            indexInRoutine,
          } = data;
          workouts.push({
            id,
            title,
            exercises,
            created,
            updated,
            routineId,
            indexInRoutine,
          });
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
        isSorted,
        setIsSorted,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};
