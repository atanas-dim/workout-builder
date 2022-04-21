import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { RoutinesContext, Routine } from "../context/RoutinesContext";

import {
  addDoc,
  Timestamp,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { firestore } from "../firebase/config";

export default function useRoutines() {
  const { routines, isLoading, setIsLoading, currentRoutineId } =
    useContext(RoutinesContext);
  const { user } = useContext(AuthContext);

  const routinesCollectionRef = user
    ? collection(firestore, "users", user.uid, "routines")
    : undefined;

  const createRoutine = async ({ id, title, ...data }: Partial<Routine>) => {
    if (!title || !routinesCollectionRef) return;

    try {
      const { id } = await addDoc(routinesCollectionRef, {
        title,
        ...data,
        created: Timestamp.fromDate(new Date()),
      });
      return id;
    } catch (error) {
      console.error("Error creating document: ", error);
    }
  };

  const updateRoutine = async ({ id, title, ...data }: Partial<Routine>) => {
    if (!routinesCollectionRef || !title) return;

    try {
      const docRef = doc(routinesCollectionRef, id);

      await updateDoc(docRef, {
        title,
        ...data,
        updated: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const deleteRoutine = async (routineId: string) => {
    if (!routineId || !routinesCollectionRef) return;

    try {
      await deleteDoc(doc(routinesCollectionRef, routineId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const getRoutineById = async (routineId: string) => {
    if (!routinesCollectionRef || !routineId) return;

    setIsLoading(true);

    try {
      let routineData: any;

      const docRef = doc(routinesCollectionRef, routineId);
      await getDoc(docRef).then((docSnap) => {
        routineData = docSnap.data();
      });

      setIsLoading(false);
      return routineData;
    } catch (error) {
      console.error("Error loading data: ", error);
    }
  };

  const setCurrentRoutine = async (id: string) => {
    if (!routinesCollectionRef || !id) return;

    try {
      const docRef = doc(routinesCollectionRef, "current");

      await setDoc(docRef, {
        id,
        updated: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const updateCurrentRoutine = async (id: string) => {
    if (!routinesCollectionRef || !id) return;

    try {
      const docRef = doc(routinesCollectionRef, "current");

      await updateDoc(docRef, {
        id,
        updated: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return {
    isLoading,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    routines,
    getRoutineById,
    currentRoutineId,
    setCurrentRoutine,
    updateCurrentRoutine,
  };
}
