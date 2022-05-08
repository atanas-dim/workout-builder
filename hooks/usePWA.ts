import { useEffect, useContext } from "react";
import { PWAContext } from "../context/PWAContext";
import { isChrome, isMobileSafari } from "react-device-detect";

import {
  isStandaloneOnChrome,
  isStandaloneOnMobileSafari,
} from "../utilities/pwaHelpers/checkStandaloneMode";

export const usePWA = () => {
  const {
    deferredPrompt,
    setDeferredPrompt,
    isStandalone,
    setIsStandalone,
    showInstallButton,
    setShowInstallButton,
    showIOSInstallModal,
    setShowIOSInstallModal,
  } = useContext(PWAContext);

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
    else if (isChrome && !deferredPrompt) {
      setShowInstallButton(false);
      return;
    } else if (!isStandalone) setShowInstallButton(true);
    else setShowInstallButton(false);
  }, [isStandalone, deferredPrompt]);

  // CHECK IF THE APP HAS BEEN SUCCESSFULLY INSTALLED IN CHROME
  useEffect(() => {
    window.addEventListener("appinstalled", onInstallationFinished);

    return () => {
      window.removeEventListener("appinstalled", onInstallationFinished);
    };
  }, []);

  const onInstallationFinished = (e: any) => {
    e.preventDefault();
    setShowInstallButton(false);
  };

  // ON INSTALL BUTTON CLICK FUNCTIONS
  const onInstallClick = async () => {
    if (isChrome) showChromeInstallPrompt();
    if (isMobileSafari) setShowIOSInstallModal(true);
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

  const hideIOSInstallModal = () => setShowIOSInstallModal(false);

  return {
    showInstallButton,
    showIOSInstallModal,
    onInstallClick,
    hideIOSInstallModal,
  };
};
