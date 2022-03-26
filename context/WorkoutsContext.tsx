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
  workoutsData: Workout[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isSorted: boolean;
  setIsSorted: Dispatch<SetStateAction<boolean>>;
  sortedWorkoutsData: RoutineGroups;
  setSortedWorkoutsData: Dispatch<SetStateAction<RoutineGroups>>;
};

const INITIAL_STATE = {
  workoutsData: [],
  isLoading: false,
  setIsLoading: () => {},
  isSorted: true,
  setIsSorted: () => {},
  sortedWorkoutsData: {},
  setSortedWorkoutsData: () => {},
};

export const WorkoutsContext =
  createContext<WorkoutsContextValue>(INITIAL_STATE);

export const WorkoutsProvider: FC = ({ children }: any) => {
  const [isSorted, setIsSorted] = useState(INITIAL_STATE.isSorted);
  const [workoutsData, setWorkoutsData] = useState<Workout[]>([]);
  const [sortedWorkoutsData, setSortedWorkoutsData] = useState<RoutineGroups>(
    INITIAL_STATE.sortedWorkoutsData
  );
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { routinesData } = useRoutines();

  useEffect(() => {
    console.log("updating  workouts data");
  }, [workoutsData]);

  // FETCH FROM FIRESTORE --------------------------
  useEffect(() => {
    if (!user) return;

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
        setIsLoading(true);
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

        setWorkoutsData(workouts);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error loading data: ", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // SORT WORKOUTS DATA --------------------------

  const getSortedWorkoutsByRoutine = () => {
    const routineGroups: {
      [key: string]: RoutineGroup;
    } = {
      unsorted: {
        id: undefined,
        title: "Unsorted",
        workouts: [],
        workoutsOrder: [],
        updated: Timestamp.fromDate(new Date(0, 0, 0)),
      },
    };

    const addedToRoutines: string[] = [];

    for (var rIndex = 0; rIndex < routinesData.length; rIndex++) {
      const routine = routinesData[rIndex];
      const newGroup: RoutineGroup = {
        id: routine.id,
        title: routine.title,
        workouts: [],
        workoutsOrder: routine?.workouts || [],
        updated: routine.updated || routine.created,
      };

      for (var wIndex = workoutsData.length - 1; wIndex >= 0; wIndex--) {
        const workout = workoutsData[wIndex];

        if (newGroup.workoutsOrder.includes(workout.id)) {
          newGroup.workouts.push(workout);
          addedToRoutines.push(workout.id);
        }
      }

      // Sort workouts objects by order of workout IDs from routine data
      newGroup.workouts.sort(
        (a, b) =>
          newGroup.workoutsOrder.indexOf(a.id) -
          newGroup.workoutsOrder.indexOf(b.id)
      );

      routineGroups[routine.id] = newGroup;
    }

    for (var wIndex = workoutsData.length - 1; wIndex >= 0; wIndex--) {
      const workout = workoutsData[wIndex];

      if (!addedToRoutines.includes(workout.id)) {
        routineGroups.unsorted.workouts.unshift(workout);
      }
    }

    return routineGroups;
  };

  useEffect(() => {
    setSortedWorkoutsData(getSortedWorkoutsByRoutine());
  }, [routinesData, workoutsData]);

  return (
    <WorkoutsContext.Provider
      value={{
        workoutsData,
        isLoading,
        setIsLoading,
        isSorted,
        setIsSorted,
        sortedWorkoutsData,
        setSortedWorkoutsData,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
};
