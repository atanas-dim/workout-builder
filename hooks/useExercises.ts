import React, { useState, useEffect } from "react";

import {
  addDoc,
  Timestamp,
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { firestore } from "../firebase/config";

import { useAuth } from "../context/AuthContext";

type Exercise = {
  id: string;
  title?: string;
  created?: Timestamp;
};

export default function useExercises() {
  const { user } = useAuth();
  const [exercisesData, setExercisesData] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) getExercisesData();
  }, [user]);

  const createExercise = async (exerciseTitle: string) => {
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
        created: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
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

  return {
    isLoading,
    createExercise,
    deleteExercise,
    exercisesData,
    getExercisesData,
  };
}
