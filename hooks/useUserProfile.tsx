import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import router from "next/router";
import { collection, addDoc, setDoc, doc, Timestamp } from "firebase/firestore";
import { firestore } from "../firebase/config";

type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
};

export default function useUserProfile() {
  const createUserDataInFirestore = async ({
    firstName,
    lastName,
    email,
    userId,
  }: UserDetails) => {
    try {
      await setDoc(doc(firestore, "users", userId), {
        firstName,
        lastName,
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
