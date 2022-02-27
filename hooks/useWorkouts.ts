import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import {
  WorkoutsContext,
  WorkoutExerciseEntry,
} from "../context/WorkoutsContext";

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

export default function useWorkouts() {
  const { workoutsData, isLoading, setIsLoading } = useContext(WorkoutsContext);
  const { user } = useContext(AuthContext);

  const workoutsCollectionRef = user
    ? collection(firestore, "users", user.uid, "workouts")
    : undefined;

  const createWorkout = async (
    workoutTitle: string,
    exercises?: WorkoutExerciseEntry[]
  ) => {
    if (!workoutTitle || !workoutsCollectionRef) return;

    try {
      await addDoc(workoutsCollectionRef, {
        title: workoutTitle,
        exercises,
        created: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error creating document: ", error);
    }
  };

  const updateWorkout = async (
    workoutId: string,
    workoutTitle: string,
    exercises?: WorkoutExerciseEntry[]
  ) => {
    if (!user || !workoutsCollectionRef) return;

    try {
      const docRef = doc(workoutsCollectionRef, workoutId);

      await updateDoc(docRef, {
        title: workoutTitle,
        exercises,
        updated: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const deleteWorkout = async (workoutId: string) => {
    if (!workoutId || !workoutsCollectionRef) return;

    try {
      await deleteDoc(doc(workoutsCollectionRef, workoutId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const getWorkoutById = async (workoutId: string) => {
    if (!workoutsCollectionRef || !workoutId) return;

    setIsLoading(true);

    try {
      let workoutData: any;

      const docRef = doc(workoutsCollectionRef, workoutId);
      await getDoc(docRef).then((docSnap) => {
        workoutData = docSnap.data();
      });

      setIsLoading(false);
      return workoutData;
    } catch (error) {
      console.error("Error loading data: ", error);
    }
  };

  return {
    isLoading,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    workoutsData,
    getWorkoutById,
  };
}
