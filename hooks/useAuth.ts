import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut as SignOutFromFirebase,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";

import useUserProfile from "./useUserProfile";
import { RouterPath } from "../resources/routes";

const useAuth = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const { createUserDataInFirestore } = useUserProfile();
  const { push } = useRouter();

  const signUp = (email: string, password: string, displayName: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName,
        })
          .then(() =>
            createUserDataInFirestore({
              email,
              displayName,
              userId: user.uid,
            })
          )
          .then(() => {
            sendEmailVerification(user).then(() => {
              console.log("Email verification sent!");
            });
          });
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //...
      })
      .catch((error) => {
        console.log(error.code, error.message);
        setError("User not found. Check your email and password.");
      });
  };

  const signOut = () => {
    SignOutFromFirebase(auth)
      .then(() => {
        console.log("Signed out");
      })
      .then(() => push(RouterPath.Login))
      .catch((error) => {
        console.log({ error });
      });
  };

  const updateAuthProfile = (name: string) => {
    if (!auth.currentUser) return;

    updateProfile(auth.currentUser, {
      displayName: name,
      // photoURL: "https://example.com/jane-q-user/profile.jpg",
    }).catch((error) => {
      // An error occurred
      console.log({ error });
    });
  };

  return { user, error, signUp, signIn, signOut };
};

export default useAuth;
