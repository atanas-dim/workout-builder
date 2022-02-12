import { useContext } from "react";

import { ExercisesContext } from "../context/ExercisesContext";

import { AuthContext } from "../context/AuthContext";

import {
  addDoc,
  Timestamp,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { firestore } from "../firebase/config";

export default function useExercises() {
  const { exercisesData, isLoading } = useContext(ExercisesContext);
  const { user } = useContext(AuthContext);

  const exercisesCollectionRef = user
    ? collection(firestore, "users", user.uid, "exercises")
    : undefined;

  const createExercise = async (exerciseTitle: string, youTubeUrl: string) => {
    if (!exercisesCollectionRef) return;
    try {
      await addDoc(exercisesCollectionRef, {
        title: exerciseTitle,
        youTubeUrl,
        created: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error creating document: ", error);
    }
  };

  const updateExercise = async (
    exerciseId: string,
    exerciseTitle: string,
    youTubeUrl: string
  ) => {
    if (!exercisesCollectionRef || !exerciseId) return;

    try {
      const docRef = doc(exercisesCollectionRef, exerciseId);

      await updateDoc(docRef, {
        title: exerciseTitle,
        youTubeUrl: youTubeUrl,
        updated: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const deleteExercise = async (exerciseId: string) => {
    if (!exerciseId || !exercisesCollectionRef) return;

    try {
      await deleteDoc(doc(exercisesCollectionRef, exerciseId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const getExerciseById = async (exerciseId: string) => {
    if (!exercisesCollectionRef || !exerciseId) return;

    try {
      let exerciseData: any;

      const docRef = doc(exercisesCollectionRef, exerciseId);
      await getDoc(docRef).then((docSnap) => {
        exerciseData = docSnap.data();
      });

      return exerciseData;
    } catch (error) {
      console.error("Error loading data: ", error);
    }
  };

  return {
    isLoading,
    createExercise,
    updateExercise,
    deleteExercise,
    exercisesData,
    getExerciseById,
  };
}
