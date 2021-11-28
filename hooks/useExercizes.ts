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

type Exercize = {
  id: string;
  title?: string;
  created?: Timestamp;
};

export default function useExercizes() {
  const { user } = useAuth();
  const [exercizesData, setExercizesData] = useState<Exercize[]>([]);

  useEffect(() => {
    if (user) getExercizesData();
  }, [user]);

  const createExercize = async (exercizeTitle: string) => {
    if (!exercizeTitle || !user) return;

    try {
      const exercizesCollectionRef = collection(
        firestore,
        "users",
        user.uid,
        "exercizes"
      );
      await addDoc(exercizesCollectionRef, {
        title: exercizeTitle,
        created: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    getExercizesData();
  };

  const getExercizesData = async () => {
    if (!user) return;

    const exercizes: Exercize[] = [];

    const exercizesCollectionRef = collection(
      firestore,
      `users/${user.uid}/exercizes`
    );
    const exercizesQuery = query(exercizesCollectionRef, orderBy("title"));

    const querySnapshot = await getDocs(exercizesQuery);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();

      exercizes.push({ id, ...data });
    });
    setExercizesData(exercizes);
    return exercizes;
  };

  return {
    createExercize,
    exercizesData,
    getExercizesData,
  };
}
