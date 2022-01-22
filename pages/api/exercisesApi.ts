import {
  addDoc,
  Timestamp,
  collection,
  query,
  orderBy,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { firestore } from "../../firebase/config";

import { Exercise } from "../../context/ExercisesContext";

export const createExerciseInFirestore = async (
  userId: string,
  exerciseTitle: string,
  youTubeUrl: string
) => {
  if (!exerciseTitle || !userId) return;

  try {
    const exercisesCollectionRef = collection(
      firestore,
      "users",
      userId,
      "exercises"
    );
    await addDoc(exercisesCollectionRef, {
      title: exerciseTitle,
      youTubeUrl,
      created: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.error("Error creating document: ", error);
  }
};

export const updateExerciseInFirestore = async (
  userId: string,
  exerciseId: string,
  exerciseTitle: string,
  youTubeUrl: string
) => {
  if (!userId || !exerciseId) return;

  try {
    const exercisesCollectionRef = collection(
      firestore,
      "users",
      userId,
      "exercises"
    );
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

export const deleteExerciseInFirestore = async (
  userId: string,
  exerciseId: string
) => {
  if (!exerciseId || !userId) return;

  try {
    const exerciseDocRef = collection(firestore, "users", userId, "exercises");

    await deleteDoc(doc(exerciseDocRef, exerciseId));
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export const getExercisesDataFromFirestore = async (userId: string) => {
  if (!userId) return;

  try {
    const exercises: Exercise[] = [];

    const exercisesCollectionRef = collection(
      firestore,
      `users/${userId}/exercises`
    );
    const exercisesQuery = query(exercisesCollectionRef, orderBy("title"));

    const querySnapshot = await getDocs(exercisesQuery);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();
      exercises.push({ id, ...data });
    });

    return exercises;
  } catch (error) {
    console.error("Error loading data: ", error);
  }
};

export const getExerciseByIdFromFirestore = async (
  userId: string,
  exerciseId: string
) => {
  if (!userId || !exerciseId) return;

  try {
    const exercisesCollectionRef = collection(
      firestore,
      `users/${userId}/exercises`
    );

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
