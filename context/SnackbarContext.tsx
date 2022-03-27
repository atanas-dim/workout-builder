import React, { useEffect, createContext, useRef } from "react";

import { ToastContainer, toast } from "react-toastify";

import { useOnlineStatus } from "../hooks/useOnlineStatus";
import useAuth from "../hooks/useAuth";

import { isStandaloneOnMobileSafari } from "../utilities/pwaHelpers/checkStandaloneMode";

import {
  Timestamp,
  collection,
  query,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase/config";

import { ButtonBase, Zoom } from "@mui/material";
import { alpha } from "@mui/system";
import { PriorityHighRounded as AttentionIcon } from "@mui/icons-material";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  toast: {
    "& .Toastify__toast-theme--colored.Toastify__toast--default": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .Toastify__toast-theme--colored.Toastify__toast--info": {
      backgroundColor: theme.palette.info.main,
    },
    "& .Toastify__toast-theme--colored.Toastify__toast--success": {
      backgroundColor: theme.palette.success.main,
    },
    "& .Toastify__toast-theme--colored.Toastify__toast--warning": {
      backgroundColor: theme.palette.warning.main,
    },
    "& .Toastify__toast-theme--colored.Toastify__toast--error": {
      backgroundColor: theme.palette.error.main,
    },
  },
}));

type SnackbarContextValue = {
  //
};
const INITIAL_STATE = {
  //
};

export const SnackbarContext =
  createContext<SnackbarContextValue>(INITIAL_STATE);

export function SnackbarProvider({ children }: any) {
  const classes = useStyles();
  const { user } = useAuth();

  const { online } = useOnlineStatus();

  // FETCH APP VERSION DATA FROM FIRESTORE AND COMPARE --------------------------
  const firstRender = useRef(true);
  useEffect(() => {
    if (!user) return;

    const docRef = doc(firestore, "app", "general");

    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        if (!doc.data) return;

        const latestVersion = doc.get("updated");

        if (firstRender.current) {
          window.localStorage.setItem("updated", latestVersion);
          firstRender.current = false;
        } else {
          const userVersion = window.localStorage.getItem("updated");
          if (!userVersion) return;

          if (+userVersion < +latestVersion) {
            toast.info(
              "Update available. Reload to get the latest version of the app 🎉",
              {
                toastId: "version-toast",
                autoClose: false,
              }
            );
          }
        }
      },
      (error) => {
        console.error("Error loading data: ", error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Offline notification
  const offlineToast = useRef<any>(null);

  useEffect(() => {
    if (!online) {
      offlineToast.current = showOfflineNotification();
    } else {
      hideOfflineNotification();
    }
  }, [online]);

  const showOfflineNotification = () =>
    toast.error("Offline", {
      toastId: "offline-toast",
    });

  const hideOfflineNotification = () =>
    toast.update(offlineToast.current, {
      autoClose: 10,
    });

  return (
    <SnackbarContext.Provider value={{}}>
      {children}

      <ToastContainer
        position={toast.POSITION.BOTTOM_LEFT}
        theme="colored"
        style={{ marginBottom: isStandaloneOnMobileSafari() ? 24 : "auto" }}
        className={classes.toast}
      />

      {/* Make this a component */}
      <Zoom in={!online}>
        <ButtonBase
          onClick={showOfflineNotification}
          sx={(theme) => ({
            position: "fixed",
            bottom: isStandaloneOnMobileSafari() ? 42 : 27,
            right: 32,
            zIndex: theme.zIndex.snackbar,
            padding: 0,
            width: 32,
            height: 32,
            minHeight: "auto",
            backgroundColor: alpha(theme.palette.error.main, 0.2),
            color: theme.palette.error.main,
            borderRadius: 999,
          })}
        >
          <AttentionIcon />
        </ButtonBase>
      </Zoom>
    </SnackbarContext.Provider>
  );
}
