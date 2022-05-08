import React, { useEffect, createContext, useRef } from "react";

import { ToastContainer, toast, cssTransition } from "react-toastify";

import { useOnlineStatus } from "../hooks/useOnlineStatus";
import useAuth from "../hooks/useAuth";
import { usePWA } from "../hooks/usePWA";

import { onSnapshot, doc } from "firebase/firestore";
import { firestore } from "../firebase/config";

import { ButtonBase, Zoom } from "@mui/material";
import { PriorityHighRounded as AttentionIcon } from "@mui/icons-material";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import theme from "../styles/theme";

const bounce = cssTransition({
  enter: "animate__animated animate__slideInUp",
  exit: "animate__animated animate__slideOutDown",
});

type StyleProps = {
  isStandalone: boolean;
};

const useStyles = (props: StyleProps) =>
  makeStyles((theme: Theme) => {
    return {
      toastContainer: {
        "--animate-duration": "300ms",
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
      toast: {
        ...(props.isStandalone && { paddingBottom: 32 }),
      },
    };
  });

type SnackbarContextValue = {
  //
};
const INITIAL_STATE = {
  //
};

export const SnackbarContext =
  createContext<SnackbarContextValue>(INITIAL_STATE);

export function SnackbarProvider({ children }: any) {
  const { isStandalone } = usePWA();
  const classes = useStyles({ isStandalone })();
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
    } else if (offlineToast.current) {
      hideOfflineNotification();
      toast.success("Connection restored");
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
        transition={bounce}
        toastClassName={classes.toast}
        className={classes.toastContainer}
      />

      <Zoom in={!online}>
        <ButtonBase
          onClick={showOfflineNotification}
          sx={{
            position: "fixed",
            bottom: isStandalone ? "38px" : "27px",
            right: 32,
            zIndex: theme.zIndex.snackbar,
            padding: 0,
            width: 32,
            height: 32,
            minHeight: "auto",
            backgroundColor: theme.palette.error.dark,
            color: pink[100],
            borderRadius: 999,
          }}
        >
          <AttentionIcon />
        </ButtonBase>
      </Zoom>
    </SnackbarContext.Provider>
  );
}
