import React, { FC, useState, useEffect, createContext } from "react";

import { useRouter } from "next/router";

import { Timestamp } from "firebase/firestore";

// import { openDb } from "idb";

import { useAuth } from "./AuthContext";

import {
  createExerciseInFirestore,
  updateExerciseInFirestore,
  deleteExerciseInFirestore,
  getExercisesDataFromFirestore,
  getExerciseByIdFromFirestore,
} from "../pages/api/exercisesApi";

export type Exercise = {
  id: string;
  title?: string;
  youTubeUrl?: string;
  created?: Timestamp;
};

type ExercisesContextValue = {
  exercisesData: Exercise[];
  isLoading: boolean;
  createExercise: (exerciseTitle: string, youTubeUrl: string) => void;
  updateExercise: (
    exerciseId: string,
    exerciseTitle: string,
    youTubeUrl: string
  ) => void;
  deleteExercise: (exerciseId: string) => void;
  getExercisesData: () => Promise<void>;
  getExerciseById: (exerciseId: string) => Promise<Exercise>;
};

const INITIAL_STATE = {
  exercisesData: [],
  isLoading: false,
  createExercise: () => Promise.resolve(),
  updateExercise: () => Promise.resolve(),
  deleteExercise: () => Promise.resolve(),
  getExercisesData: () => Promise.resolve(),
  getExerciseById: () => Promise.resolve({ id: "" }),
};

export const ExercisesContext =
  createContext<ExercisesContextValue>(INITIAL_STATE);

export const ExercisesProvider: FC = ({ children }: any) => {
  const { user } = useAuth();
  const [exercisesData, setExercisesData] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { pathname } = useRouter();

  useEffect(() => {
    console.log("updating  exercises data");
  }, [exercisesData]);

  useEffect(() => {
    if (user) getExercisesData();
  }, [user]);

  // // ---------------- TESTING IDB -------------
  // // Move idb functions to separate api file to reuse and create Exercises Context
  // useEffect(() => {
  //   if (window.navigator.onLine && exercisesData.length)
  //     writeToIdb(exercisesData);
  // }, [exercisesData]);

  // // ----------------

  // useEffect(() => {
  //   if (pathname === "/exercises" && !window.navigator.onLine) readFromIdb();
  // }, [pathname]);

  // const OBJECT_STORE_NAME = "store";
  // let idbPromise: any;

  // if (typeof window !== "undefined")
  //   idbPromise = openDb("workout-builder", 1, (upgradeDb) => {
  //     const exerciseStore = upgradeDb.createObjectStore(OBJECT_STORE_NAME);
  //     exerciseStore.put([], "exercises");
  //   });

  // const readFromIdb = () => {
  //   console.log("reading from IDB");
  //   idbPromise
  //     .then((db: IDBDatabase) => {
  //       const transaction = db.transaction(OBJECT_STORE_NAME);
  //       const idbStore = transaction.objectStore(OBJECT_STORE_NAME);
  //       return idbStore.get("exercises");
  //     })
  //     .then((value: any) => {
  //       console.log({ value });
  //       setExercisesData(value);
  //       setIsLoading(false);
  //     });
  // };

  // const writeToIdb = (data: any) => {
  //   idbPromise
  //     .then((db: IDBDatabase) => {
  //       const transaction = db.transaction(OBJECT_STORE_NAME, "readwrite");
  //       const idbStore = transaction.objectStore(OBJECT_STORE_NAME);
  //       idbStore.put(data, "exercises");
  //       return transaction.oncomplete;
  //     })
  //     .then(() => {
  //       console.log("Added to Idb");
  //     });
  // };

  // // ----------------

  const createExercise = (exerciseTitle: string, youTubeUrl: string) => {
    if (!user) return;
    createExerciseInFirestore(user.uid, exerciseTitle, youTubeUrl);

    getExercisesData();
  };

  const updateExercise = (
    exerciseId: string,
    exerciseTitle: string,
    youTubeUrl: string
  ) => {
    if (!user || !exerciseId) return;
    updateExerciseInFirestore(user.uid, exerciseId, exerciseTitle, youTubeUrl);

    getExercisesData();
  };

  const deleteExercise = (exerciseId: string) => {
    if (!exerciseId || !user) return;
    deleteExerciseInFirestore(user.uid, exerciseId);

    getExercisesData();
  };

  const getExercisesData = async () => {
    // if (!window.navigator.onLine) {
    //   console.log("offline");
    //   readFromIdb();
    //   return;
    // }

    if (!user) return;
    setIsLoading(true);

    const data = await getExercisesDataFromFirestore(user.uid);

    if (data) setExercisesData(data);
    setIsLoading(false);
  };

  const getExerciseById = async (exerciseId: string) => {
    if (!user || !exerciseId) return;
    setIsLoading(true);

    const data = await getExerciseByIdFromFirestore(user.uid, exerciseId);

    setIsLoading(false);
    return data;
  };

  return (
    <ExercisesContext.Provider
      value={{
        isLoading,
        exercisesData,
        createExercise,
        updateExercise,
        deleteExercise,
        getExercisesData,
        getExerciseById,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
};
