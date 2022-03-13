import React, {
  FC,
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

import { Timestamp, collection, query, onSnapshot } from "firebase/firestore";

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
  routinesData: Routine[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const INITIAL_STATE = {
  routinesData: [],
  isLoading: false,
  setIsLoading: () => {},
};

export const RoutinesContext =
  createContext<RoutinesContextValue>(INITIAL_STATE);

export const RoutinesProvider: FC = ({ children }: any) => {
  const [routinesData, setRoutinesData] = useState<Routine[]>([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("updating  routines data", { routinesData });
  }, [routinesData]);

  useEffect(() => {
    if (!user) return;

    const routinesCollectionRef = collection(
      firestore,
      "users",
      user.uid,
      "routines"
    );

    const routinesQuery = query(routinesCollectionRef);

    const unsubscribe = onSnapshot(
      routinesQuery,
      (querySnapshot) => {
        setIsLoading(true);
        const routines: Routine[] = [];

        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          const { title, created, updated, workouts } = data;
          routines.push({ id, title, created, workouts, updated });
        });

        setRoutinesData(routines);
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
        routinesData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </RoutinesContext.Provider>
  );
};
