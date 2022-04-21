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
  onSnapshot,
  doc,
  where,
  documentId,
} from "firebase/firestore";

import { firestore } from "../firebase/config";

import useAuth from "../hooks/useAuth";

export type Routine = {
  id: string;
  title: string;
  created: Timestamp;
  updated: Timestamp;
  workouts?: string[];
};

type RoutinesContextValue = {
  routines: Routine[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  currentRoutineId?: string;
};

const INITIAL_STATE = {
  routines: [],
  isLoading: false,
  setIsLoading: () => {},
  currentRoutineId: undefined,
};

export const RoutinesContext =
  createContext<RoutinesContextValue>(INITIAL_STATE);

export const RoutinesProvider: FC = ({ children }: any) => {
  const [routines, setRoutines] = useState<Routine[]>(INITIAL_STATE.routines);
  const [currentRoutineId, setCurrentRoutineId] = useState<string | undefined>(
    INITIAL_STATE.currentRoutineId
  );

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("updating routines data");
  }, [routines]);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);

    const routinesCollectionRef = collection(
      firestore,
      "users",
      user.uid,
      "routines"
    );

    const routinesQuery = query(
      routinesCollectionRef,
      where(documentId(), "!=", "current")
    );

    const unsubscribe = onSnapshot(
      routinesQuery,
      (querySnapshot) => {
        const routines: Routine[] = [];

        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          const { title, created, updated, workouts } = data;

          routines.push({ id, title, created, workouts, updated });
        });

        setRoutines(routines);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error loading data: ", error);
      }
    );
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);

    const currentRoutineDocRef = doc(
      firestore,
      "users",
      user.uid,
      "routines",
      "current"
    );

    const unsubscribe = onSnapshot(
      currentRoutineDocRef,
      (snapshot) => {
        const data = snapshot.data();

        const { id } = data || {};

        setCurrentRoutineId(id);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error loading data: ", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <RoutinesContext.Provider
      value={{
        routines,
        isLoading,
        setIsLoading,
        currentRoutineId,
      }}
    >
      {children}
    </RoutinesContext.Provider>
  );
};
