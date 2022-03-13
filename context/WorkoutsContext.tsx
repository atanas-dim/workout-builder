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

  useEffect(() => {
    if (!user) return;
    subscribeToWorkoutsData();
  }, [user, isSorted]);

  const workoutsCollectionRef = user
    ? collection(firestore, "users", user.uid, "workouts")
    : undefined;

  // FETCH FROM FIRESTORE --------------------------

  const subscribeToWorkoutsData = async () => {
    if (!workoutsCollectionRef) return;

    const workoutsQuery = isSorted
      ? query(workoutsCollectionRef)
      : query(workoutsCollectionRef, orderBy("title"));

    onSnapshot(
      workoutsQuery,
      async (querySnapshot) => {
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
  };

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

    routinesData.forEach((routine) => {
      const newGroup: RoutineGroup = {
        id: routine.id,
        title: routine.title,
        workouts: [],
        workoutsOrder: routine.workouts,
        updated: routine.updated || routine.created,
      };

      routine?.workouts?.forEach((workoutOrderId) => {
        const foundWorkout = workoutsData.find(
          (workout) => workout.id === workoutOrderId
        );
        if (foundWorkout) newGroup.workouts.push(foundWorkout);
      });

      routineGroups[routine.id] = newGroup;
    });

    workoutsData.forEach((workout) => {
      let existsInRoutine = false;
      Object.keys(routineGroups).forEach((key) => {
        if (routineGroups[key].workoutsOrder.includes(workout.id)) {
          existsInRoutine = true;
          return;
        }
      });
      if (!existsInRoutine) routineGroups.unsorted.workouts.push(workout);
    });

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
