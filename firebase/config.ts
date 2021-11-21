import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();

export const signUp = (email: string, password: string, name: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name,
      }).then(() => {
        sendEmailVerification(user).then(() => {
          console.log("Email verification sent!");
        });
      });
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    });
};

export const signIn = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      //...
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    });
};

export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log("Signed out");
    })
    .then(() => window.location.replace("/login"))
    .catch((error) => {
      console.log({ error });
    });
};

export const updateUserProfile = (name: string) => {
  if (!auth.currentUser) return;

  updateProfile(auth.currentUser, {
    displayName: name,
    // photoURL: "https://example.com/jane-q-user/profile.jpg",
  })
    .then(() => {
      console.log("Profile updated");
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      console.log({ error });
    });
};
