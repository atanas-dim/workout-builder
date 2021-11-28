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

type Exersize = {
  id: string;
  title?: string;
  created?: Timestamp;
};

export default function useExersizes() {
  const { user } = useAuth();
  const [exersizesData, setExersizesData] = useState<Exersize[]>([]);

  useEffect(() => {
    if (user) getExersizesData();
  }, [user]);

  const createExersize = async (exersizeTitle: string) => {
    if (!exersizeTitle || !user) return;

    try {
      const collectionRef = collection(
        firestore,
        "exersizes",
        user.uid,
        "exersizes"
      );
      await addDoc(collectionRef, {
        title: exersizeTitle,
        created: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    getExersizesData();
  };

  const getExersizesData = async () => {
    if (!user) return;

    const exersizes: Exersize[] = [];

    const exersizesRef = collection(
      firestore,
      `exersizes/${user.uid}/exersizes`
    );
    const exersizesQuery = query(exersizesRef, orderBy("title"));

    const querySnapshot = await getDocs(exersizesQuery);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();

      exersizes.push({ id, ...data });
    });
    setExersizesData(exersizes);
    return exersizes;
  };

  return { createExersize, exersizesData, getExersizesData };
}
