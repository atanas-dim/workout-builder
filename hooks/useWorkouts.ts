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
  arrayUnion,
} from "firebase/firestore";

import { firestore } from "../firebase/config";

import { useAuth } from "../context/AuthContext";

export type WorkoutExerciseEntry = {
  draggableId: string;
  id: string;
  reps: number;
  sets: number;
};

export type Workout = {
  id: string;
  title?: string;
  exercises?: WorkoutExerciseEntry[];
  created?: Timestamp;
};

export default function useWorkouts() {
  const { user } = useAuth();
  const [workoutsData, setWorkoutsData] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) getWorkoutsData();
  }, [user]);

  const createWorkout = async (
    workoutTitle: string,
    exercises?: WorkoutExerciseEntry[]
  ) => {
    if (!workoutTitle || !user) return;

    try {
      const workoutsCollectionRef = collection(
        firestore,
        "users",
        user.uid,
        "workouts"
      );
      await addDoc(workoutsCollectionRef, {
        title: workoutTitle,
        exercises,
        created: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
    }

    getWorkoutsData();
  };

  const deleteWorkout = async (workoutId: string) => {
    if (!workoutId || !user) return;

    try {
      const workoutDocRef = collection(
        firestore,
        "users",
        user.uid,
        "workouts"
      );

      await deleteDoc(doc(workoutDocRef, workoutId));
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    getWorkoutsData();
  };

  const getWorkoutsData = async () => {
    if (!user) return;
    setIsLoading(true);

    const workouts: Workout[] = [];

    const workoutsCollectionRef = collection(
      firestore,
      `users/${user.uid}/workouts`
    );
    const workoutsQuery = query(workoutsCollectionRef, orderBy("title"));

    const querySnapshot = await getDocs(workoutsQuery);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();

      workouts.push({ id, ...data });
    });
    setWorkoutsData(workouts);
    setIsLoading(false);
    return workouts;
  };

  return {
    isLoading,
    createWorkout,
    deleteWorkout,
    workoutsData,
    getWorkoutsData,
  };
}
