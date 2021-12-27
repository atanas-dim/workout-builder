import React, { useState, useEffect } from "react";

import {
  addDoc,
  Timestamp,
  collection,
  query,
  orderBy,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { firestore } from "../firebase/config";

import { useAuth } from "../context/AuthContext";

export type Exercise = {
  id: string;
  title?: string;
  youTubeUrl?: string;
  created?: Timestamp;
};

export default function useExercises() {
  const { user } = useAuth();
  const [exercisesData, setExercisesData] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) getExercisesData();
  }, [user]);

  const createExercise = async (exerciseTitle: string, youTubeUrl: string) => {
    if (!exerciseTitle || !user) return;

    try {
      const exercisesCollectionRef = collection(
        firestore,
        "users",
        user.uid,
        "exercises"
      );
      await addDoc(exercisesCollectionRef, {
        title: exerciseTitle,
        youTubeUrl,
        created: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
    }

    getExercisesData();
  };

  const updateExercise = async (
    exerciseId: string,
    exerciseTitle: string,
    youTubeUrl: string
  ) => {
    if (!user || !exerciseId) return;

    try {
      const exercisesCollectionRef = collection(
        firestore,
        "users",
        user.uid,
        "exercises"
      );
      const docRef = doc(exercisesCollectionRef, exerciseId);

      await updateDoc(docRef, {
        title: exerciseTitle,
        youTubeUrl: youTubeUrl,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }

    getExercisesData();
  };

  const deleteExercise = async (exerciseId: string) => {
    if (!exerciseId || !user) return;

    try {
      const exerciseDocRef = collection(
        firestore,
        "users",
        user.uid,
        "exercises"
      );

      await deleteDoc(doc(exerciseDocRef, exerciseId));
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    getExercisesData();
  };

  const getExercisesData = async () => {
    if (!user) return;
    setIsLoading(true);

    const exercises: Exercise[] = [];

    const exercisesCollectionRef = collection(
      firestore,
      `users/${user.uid}/exercises`
    );
    const exercisesQuery = query(exercisesCollectionRef, orderBy("title"));

    const querySnapshot = await getDocs(exercisesQuery);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();

      exercises.push({ id, ...data });
    });
    setExercisesData(exercises);
    setIsLoading(false);
    return exercises;
  };

  const getExerciseById = async (exerciseId: string) => {
    if (!user || !exerciseId) return;
    setIsLoading(true);

    const exercisesCollectionRef = collection(
      firestore,
      `users/${user.uid}/exercises`
    );

    let exerciseData: any;

    const docRef = doc(exercisesCollectionRef, exerciseId);
    await getDoc(docRef).then((docSnap) => {
      exerciseData = docSnap.data();
    });

    setIsLoading(false);
    return exerciseData;
  };

  return {
    isLoading,
    createExercise,
    updateExercise,
    deleteExercise,
    exercisesData,
    getExercisesData,
    getExerciseById,
  };
}
