import React, {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

import { doc, onSnapshot } from "firebase/firestore";

import { firestore } from "../firebase/config";

import useAuth from "../hooks/useAuth";

import { Snackbar } from "@mui/material";

type SnackbarContextValue = {
  setShowSnack: Dispatch<SetStateAction<boolean>>;
};

export const SnackbarContext = createContext<SnackbarContextValue>({
  setShowSnack: () => {},
});

export function SnackbarProvider({ children }: any) {
  const { user } = useAuth();
  const [showSnack, setShowSnack] = useState<boolean>(false);

  // FETCH APP VERSION DATA FROM FIRESTORE AND COMPARE --------------------------
  useEffect(() => {
    if (!user) return;

    const docRef = doc(firestore, "app", "general");

    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        if (!doc.data) return;
        if (showSnack) setShowSnack(false); // resetting
        const currentVersion = doc.get("version");
        const userVersion = window.localStorage.getItem("version");

        if (!userVersion)
          window.localStorage.setItem("version", currentVersion);
        else if (userVersion !== currentVersion) {
          setShowSnack(true);
          window.localStorage.setItem("version", currentVersion);
        }
      },
      (error) => {
        console.error("Error loading data: ", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return (
    <SnackbarContext.Provider value={{ setShowSnack }}>
      {children}
      <Snackbar
        open={showSnack}
        // autoHideDuration={10000}
        onClose={() => setShowSnack(false)}
        message="Update available. Reload to get the latest version of the app 🎉"
        // action={action}
      />
    </SnackbarContext.Provider>
  );
}
