import React, { useEffect, useState, useCallback } from "react";

import { useRouter } from "next/router";
import { ROUTE_VALUES, RouterPaths } from "../../pages/_app";

import { isChrome, isMobileSafari } from "react-device-detect";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material/";
import { DownloadForOffline as DownloadIcon } from "@mui/icons-material";

import InstallInstructionsModal from "../modals/InstallInstructionsModal";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `solid 1px ${theme.palette.divider}`,
    transition: theme.transitions.create(["height"], {
      duration: theme.transitions.duration.short,
    }),
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
}));

export default function Header() {
  const classes = useStyles();
  const router = useRouter();

  const [deferredPrompt, setDeferredPrompt] = useState<any>();
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [showInstallButton, setShowInstallButton] = useState<boolean>(false);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);

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
  }, [isChrome, isMobileSafari, isStandalone, deferredPrompt]);

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

  // INSTALL PROMPT FOR PWA
  useEffect(() => {
    // First check if it's standalone
    if (isChrome && isStandaloneOnChrome()) setIsStandalone(true);
    if (isMobileSafari && isStandaloneOnMobileSafari()) setIsStandalone(true);

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

  const isStandaloneOnChrome = () => {
    if (typeof window !== "undefined")
      return window.matchMedia("(display-mode: standalone)").matches;
  };

  const isStandaloneOnMobileSafari = () => {
    //@ts-ignore
    return window.navigator.standalone === true;
  };

  const saveInstallPromptEvent = (e: any) => {
    e.preventDefault();
    setDeferredPrompt(e);
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

  useEffect(() => {
    window.addEventListener("scroll", getScrollDirection);

    return () => window.removeEventListener("scroll", getScrollDirection);
  }, [previousScrollTop]);

  const getScrollDirection = () => {
    const scrollTop = document.documentElement.scrollTop;
    // console.log({ scrollTop, previousScrollTop });

    if (scrollTop > previousScrollTop) {
      setHasScrolledUp(true);
    } else {
      setHasScrolledUp(false);
    }

    setPreviousScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  return (
    <>
      <AppBar
        className={classes.root}
        elevation={0}
        sx={{ height: hasScrolledUp ? 40 : 56 }}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" component="div">
            {ROUTE_VALUES[router.pathname]?.title}
          </Typography>

          {showInstallButton && (
            <>
              <IconButton
                sx={{ position: "absolute", right: 24 }}
                onClick={onInstallClick}
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
