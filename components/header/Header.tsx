import React, { useEffect, useState, useCallback } from "react";

import { useRouter } from "next/router";
import { RouterPath, ROUTE_SETTINGS } from "../../resources/routes";

import { isChrome, isMobileSafari } from "react-device-detect";
import {
  isStandaloneOnMobileSafari,
  isStandaloneOnChrome,
} from "../../utilities/pwaHelpers/checkStandaloneMode";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material/";
import {
  DownloadForOffline as DownloadIcon,
  ArrowBackIosNew as BackIcon,
} from "@mui/icons-material";

import InstallInstructionsModal from "../modals/InstallInstructionsModal";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.shadows[3],
    borderRadius: 999,
    top: 8,
    left: 16,
    right: 16,
    margin: "auto",
    width: "calc(100% - 32px)",
    maxWidth: theme.breakpoints.values.md,
    transition: theme.transitions.create(["height"], {
      duration: theme.transitions.duration.short,
    }),
  },
  headerBg: {
    background: `linear-gradient(${theme.palette.background.default} 30%, transparent)`,
    position: "fixed",
    top: 0,
    width: "100%",
    height: 48,
    zIndex: theme.zIndex.appBar,
  },
  toolbar: {
    minHeight: "initial !important",
    height: "100%",
    width: "100%",
    maxWidth: theme.breakpoints.values.md,
    padding: theme.spacing(0, 3),
    justifyContent: "center",
    position: "relative",
    transition: theme.transitions.create(["height"], {
      duration: theme.transitions.duration.short,
    }),
  },
  installButton: {
    position: "absolute",
    right: 24,
    animation: `$pulse 12s ${theme.transitions.easing.easeInOut} infinite `,
  },
  "@keyframes pulse": {
    "75%": {
      boxShadow: `0 0 0 -2px ${alpha(
        theme.palette.primary.main,
        0.4
      )}, 0 0 0 -2px ${alpha(theme.palette.primary.main, 0.4)}`,
    },
    "100%": {
      boxShadow: `0 0 0 10px transparent, 0 0 0 16px transparent`,
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const router = useRouter();

  const [deferredPrompt, setDeferredPrompt] = useState<any>();
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [showInstallButton, setShowInstallButton] = useState<boolean>(false);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);

  const onBackClick = () => {
    if (router.pathname === RouterPath.WorkoutEditor)
      router.push(RouterPath.Workouts);
    else router.back();
  };

  // INSTALL PROMPT FOR PWA
  useEffect(() => {
    // First check if it's standalone
    if (isStandaloneOnChrome() || isStandaloneOnMobileSafari()) {
      setIsStandalone(true);
      return;
    }

    // Then save the install prompt to use it on Install Button onClick
    window.addEventListener(
      "beforeinstallprompt",
      saveInstallPromptEvent as any
    );
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        saveInstallPromptEvent as any
      );
    };
  }, []);

  const saveInstallPromptEvent = (e: any) => {
    e.preventDefault();
    setDeferredPrompt(e);
  };

  // CHECK WHEN TO SHOW THE INSTALL BUTTON
  useEffect(() => {
    // Currently we support install on Chrome and Mobile Safari only
    if (!(isChrome || isMobileSafari)) {
      setShowInstallButton(false);
      return;
    }

    // If the app is already installed the deferredPrompt will be undefined
    // This is workaround to not use getInstalledRelatedApps() API
    if (isChrome && !deferredPrompt) {
      setShowInstallButton(false);
      return;
    }

    if (!isStandalone) setShowInstallButton(true);
    else setShowInstallButton(false);
  }, [isStandalone, deferredPrompt]);

  // CHECK IF THE APP HAS BEEN SUCCESSFULLY INSTALLED IN CHROME
  useEffect(() => {
    window.addEventListener("appinstalled", checkInstallionHasFinished);

    return () => {
      window.removeEventListener("appinstalled", checkInstallionHasFinished);
    };
  }, []);

  const checkInstallionHasFinished = (e: any) => {
    e.preventDefault();
    setShowInstallButton(false);
  };

  // ON INSTALL BUTTON CLICK FUNCTIONS
  const onInstallClick = async () => {
    if (isChrome) showChromeInstallPrompt();
    if (isMobileSafari) setShowInstallModal(true);
  };

  const showChromeInstallPrompt = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    }
  };

  // SCROLL EFFECT ON HEADER HEIGHT
  const [hasScrolledUp, setHasScrolledUp] = useState(false);
  const [previousScrollTop, setPreviousScrollTop] = useState(0);

  const getScrollDirection = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;

    if (scrollTop > previousScrollTop) {
      setHasScrolledUp(true);
    } else {
      setHasScrolledUp(false);
    }

    setPreviousScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  }, [previousScrollTop]);

  useEffect(() => {
    window.addEventListener("scroll", getScrollDirection);

    return () => window.removeEventListener("scroll", getScrollDirection);
  }, [previousScrollTop, getScrollDirection]);

  return (
    <>
      <Box className={classes.headerBg} />
      <AppBar
        className={classes.root}
        elevation={1}
        sx={{ height: hasScrolledUp ? 40 : 56 }}
      >
        <Toolbar id="header-toolbar" className={classes.toolbar}>
          {router.pathname === RouterPath.WorkoutEditor && (
            <IconButton
              sx={{ position: "absolute", left: 24 }}
              onClick={onBackClick}
            >
              <BackIcon fontSize="small" />
            </IconButton>
          )}
          <Typography variant="h6" component="h1">
            {ROUTE_SETTINGS[router.pathname as RouterPath]?.title}
          </Typography>

          {router.pathname !== RouterPath.WorkoutEditor && showInstallButton && (
            <>
              <IconButton
                onClick={onInstallClick}
                className={classes.installButton}
              >
                <DownloadIcon />
              </IconButton>
              <InstallInstructionsModal
                showModal={showInstallModal}
                hideModal={() => setShowInstallModal(false)}
              />
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
