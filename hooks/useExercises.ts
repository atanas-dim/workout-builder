import React, { useState, useEffect } from "react";

import {
  addDoc,
  Timestamp,
  collection,
  getDocs,
  query,
  orderBy,
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
      console.error("Error adding document: ", error);
    }

    getExercisesData();
  };

  const getExercisesData = async () => {
    if (!user) return;

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
    return exercises;
  };

  return {
    createExercise,
    exercisesData,
    getExercisesData,
  };
}
