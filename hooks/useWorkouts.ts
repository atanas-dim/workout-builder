import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { WorkoutsContext, Workout } from "../context/WorkoutsContext";

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
  const {
    workouts,
    setWorkouts,
    isLoading,
    isSorted,
    setIsSorted,
    routineGroups,
  } = useContext(WorkoutsContext);
  const { user } = useContext(AuthContext);

  const workoutsCollectionRef = user
    ? collection(firestore, "users", user.uid, "workouts")
    : undefined;

  const createWorkout = async ({ title, exercises }: Partial<Workout>) => {
    if (!title || !workoutsCollectionRef) return;

    try {
      const { id } = await addDoc(workoutsCollectionRef, {
        title,
        exercises,
        created: Timestamp.fromDate(new Date()),
      });
      return id;
    } catch (error) {
      console.error("Error creating document: ", error);
    }
  };

  const updateWorkout = async ({ id, ...data }: Partial<Workout>) => {
    if (!id || !workoutsCollectionRef) return;

    try {
      const docRef = doc(workoutsCollectionRef, id);

      await updateDoc(docRef, {
        ...data,
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

    try {
      let workoutData: any;

      const docRef = doc(workoutsCollectionRef, workoutId);
      await getDoc(docRef).then((docSnap) => {
        workoutData = docSnap.data();
      });

      return workoutData;
    } catch (error) {
      console.error("Error loading data: ", error);
    }
  };

  const resetWorkouts = () => {
    setWorkouts([]);
  };

  return {
    isLoading,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    workouts,
    getWorkoutById,

    isSorted,
    setIsSorted,
    routineGroups,

    resetWorkouts,
  };
}
