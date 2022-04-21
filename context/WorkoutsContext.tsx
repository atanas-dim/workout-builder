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

import useAuth from "../hooks/useAuth";
import useRoutines from "../hooks/useRoutines";

import { sortWorkoutsByRoutine } from "../utilities/workouts/sortWorkoutsByRoutine";

export type WorkoutExerciseEntry = {
  id: string;
  name: string;
  reps: string;
  sets: string;
  videoUrl: string;
};

export type Workout = {
  id: string;
  title: string;
  exercises: WorkoutExerciseEntry[];
  created: Timestamp;
  updated: Timestamp;
};

export type RoutineGroup = {
  id?: string;
  title: string;
  workoutsOrder: string[];
  workouts: Workout[];
  updated: Timestamp;
};

type RoutineGroups = {
  [key: string]: RoutineGroup;
};

type WorkoutsContextValue = {
  workouts: Workout[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isSorted: boolean;
  setIsSorted: Dispatch<SetStateAction<boolean>>;
  sortedWorkouts: RoutineGroups;
};

const INITIAL_STATE = {
  workouts: [],
  isLoading: false,
  setIsLoading: () => {},
  isSorted: true,
  setIsSorted: () => {},
  sortedWorkouts: {},
};

export const WorkoutsContext =
  createContext<WorkoutsContextValue>(INITIAL_STATE);

export const WorkoutsProvider: FC = ({ children }: any) => {
  const [isSorted, setIsSorted] = useState(INITIAL_STATE.isSorted);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [sortedWorkouts, setSortedWorkouts] = useState<RoutineGroups>(
    INITIAL_STATE.sortedWorkouts
  );
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { routines } = useRoutines();

  useEffect(() => {
    console.log("updating  workouts data");
  }, [workouts]);

  // FETCH FROM FIRESTORE --------------------------
  useEffect(() => {
    if (!user) return;
    setIsLoading(true);

    const workoutsCollectionRef = collection(
      firestore,
      "users",
      user.uid,
      "workouts"
    );

    const workoutsQuery = query(workoutsCollectionRef, orderBy("title"));

    const unsubscribe = onSnapshot(
      workoutsQuery,
      (querySnapshot) => {
        const workouts: Workout[] = [];

        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          const { title, exercises, created, updated } = data;
          workouts.push({
            id,
            title,
            exercises,
            created,
            updated,
          });
        });

        setWorkouts(workouts);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error loading data: ", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // SORT WORKOUTS DATA --------------------------
  useEffect(() => {
    setSortedWorkouts(sortWorkoutsByRoutine(routines, workouts));
  }, [routines, workouts]);

  return (
    <WorkoutsContext.Provider
      value={{
        workouts,
        isLoading,
        setIsLoading,
        isSorted,
        setIsSorted,
        sortedWorkouts,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};
