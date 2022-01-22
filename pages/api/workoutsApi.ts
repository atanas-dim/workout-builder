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

import { Workout, WorkoutExerciseEntry } from "../../context/WorkoutsContext";

export const createWorkoutInFirestore = async (
  userId: string,
  workoutTitle: string,
  exercises?: WorkoutExerciseEntry[]
) => {
  if (!workoutTitle || !userId) return;

  try {
    const workoutsCollectionRef = collection(
      firestore,
      "users",
      userId,
      "workouts"
    );
    await addDoc(workoutsCollectionRef, {
      title: workoutTitle,
      exercises,
      created: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.error("Error creating document: ", error);
  }
};

export const updateWorkoutInFirestore = async (
  userId: string,
  workoutId: string,
  workoutTitle: string,
  exercises?: WorkoutExerciseEntry[]
) => {
  if (!userId || !workoutId) return;

  try {
    const workoutsCollectionRef = collection(
      firestore,
      "users",
      userId,
      "workouts"
    );
    const docRef = doc(workoutsCollectionRef, workoutId);

    return await updateDoc(docRef, {
      title: workoutTitle,
      exercises,
      updated: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

export const deleteWorkoutInFirestore = async (
  userId: string,
  workoutId: string
) => {
  if (!workoutId || !userId) return;

  try {
    const workoutDocRef = collection(firestore, "users", userId, "workouts");

    await deleteDoc(doc(workoutDocRef, workoutId));
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getWorkoutsDataFromFirestore = async (userId: string) => {
  if (!userId) return;

  try {
    const workouts: Workout[] = [];

    const workoutsCollectionRef = collection(
      firestore,
      `users/${userId}/workouts`
    );
    const workoutsQuery = query(workoutsCollectionRef, orderBy("title"));

    const querySnapshot = await getDocs(workoutsQuery);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      const data = doc.data();

      workouts.push({ id, ...data });
    });

    return workouts;
  } catch (error) {
    console.error("Error loading data: ", error);
  }
};

export const getWorkoutByIdFromFirestore = async (
  userId: string,
  workoutId: string
) => {
  if (!userId || !workoutId) return;

  try {
    const workoutsCollectionRef = collection(
      firestore,
      `users/${userId}/workouts`
    );

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
