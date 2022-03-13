import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { RoutinesContext, Routine } from "../context/RoutinesContext";

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

export default function useRoutines() {
  const { routinesData, isLoading, setIsLoading } = useContext(RoutinesContext);
  const { user } = useContext(AuthContext);

  const routinesCollectionRef = user
    ? collection(firestore, "users", user.uid, "routines")
    : undefined;

  const createRoutine = async (routineTitle: string) => {
    if (!routineTitle || !routinesCollectionRef) return;

    try {
      const { id } = await addDoc(routinesCollectionRef, {
        title: routineTitle,
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

  return {
    isLoading,
    createRoutine,
    updateRoutine,
    deleteRoutine,
    routinesData,
    getRoutineById,
  };
}
