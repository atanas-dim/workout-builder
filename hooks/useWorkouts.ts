import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { WorkoutsContext, Workout } from "../context/WorkoutsContext";

import {
  addDoc,
  Timestamp,
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { firestore } from "../firebase/config";

export default function useWorkouts() {
  const { workoutsData, isLoading, setIsLoading, isSorted, setIsSorted } =
    useContext(WorkoutsContext);
  const { user } = useContext(AuthContext);

  const workoutsCollectionRef = user
    ? collection(firestore, "users", user.uid, "workouts")
    : undefined;

  const createWorkout = async ({
    title,
    routineId,
    exercises,
  }: Partial<Workout>) => {
    if (!title || !workoutsCollectionRef) return;

    try {
      const { id } = await addDoc(workoutsCollectionRef, {
        title,
        routineId,
        indexInRoutine: "",
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
        indexInRoutine: data.routineId ? data.indexInRoutine : "",
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

  const getWorkoutsByRoutineId = async (routineId: string) => {
    if (!workoutsCollectionRef || !routineId) return;

    setIsLoading(true);

    try {
      const workouts: Workout[] = [];

      const workoutsByRoutineQuery = query(
        workoutsCollectionRef,
        where("routineId", "==", routineId),
        orderBy("indexInRoutine", "asc")
      );

      await getDocs(workoutsByRoutineQuery).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          const data = doc.data();
          const {
            title,
            exercises,
            created,
            updated,
            routineId,
            indexInRoutine,
          } = data;
          workouts.push({
            id,
            title,
            exercises,
            created,
            updated,
            routineId,
            indexInRoutine,
          });
        });
      });

      setIsLoading(false);
      return workouts;
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
    getWorkoutsByRoutineId,
    isSorted,
    setIsSorted,
  };
}
