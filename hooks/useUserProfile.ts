import { setDoc, doc, Timestamp } from "firebase/firestore";
import { firestore } from "../firebase/config";

type UserDetails = {
  displayName: string;
  email: string;
  userId: string;
};

export default function useUserProfile() {
  const createUserDataInFirestore = async ({
    displayName,

    email,
    userId,
  }: UserDetails) => {
    try {
      await setDoc(doc(firestore, "users", userId), {
        displayName,
        email,
        joined: Timestamp.fromDate(new Date()),
      });
      console.log("Document written to Firestore");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return { createUserDataInFirestore };
}
