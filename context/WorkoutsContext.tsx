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

export type WorkoutExtended = Workout & { orderId?: string };

export type WorkoutOrderItem = { id: string; orderId: string };

export type RoutineGroup = {
  id?: string;
  title: string;
  workoutsOrder: WorkoutOrderItem[];
  workouts: { [key: string]: WorkoutExtended };
  updated: Timestamp;
};

type RoutineGroups = {
  [key: string]: RoutineGroup;
};

type WorkoutsContextValue = {
  workouts: Workout[];
  setWorkouts: Dispatch<SetStateAction<Workout[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isSorted: boolean;
  setIsSorted: Dispatch<SetStateAction<boolean>>;
  routineGroups: RoutineGroups;
};

const INITIAL_STATE = {
  workouts: [],
  setWorkouts: () => {},
  isLoading: true,
  setIsLoading: () => {},
  isSorted: true,
  setIsSorted: () => {},
  routineGroups: {},
};

export const WorkoutsContext =
  createContext<WorkoutsContextValue>(INITIAL_STATE);

export const WorkoutsProvider: FC = ({ children }: any) => {
  const [isSorted, setIsSorted] = useState(INITIAL_STATE.isSorted);
  const [workouts, setWorkouts] = useState<Workout[]>(INITIAL_STATE.workouts);
  const [routineGroups, setRoutineGroups] = useState<RoutineGroups>(
    INITIAL_STATE.routineGroups
  );
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(INITIAL_STATE.isLoading);

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
        if (querySnapshot.metadata.fromCache) return;

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
    if (!routines || !workouts) return;
    setRoutineGroups(sortWorkoutsByRoutine(routines, workouts));
  }, [routines, workouts]);

  return (
    <WorkoutsContext.Provider
      value={{
        workouts,
        setWorkouts,
        isLoading,
        setIsLoading,
        isSorted,
        setIsSorted,
        routineGroups,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};
