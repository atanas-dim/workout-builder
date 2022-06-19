import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";

import { Portal } from "@mui/material";

type PWAContextProps = {
  deferredPrompt: any;
  setDeferredPrompt: Dispatch<SetStateAction<any>>;
  isStandalone: boolean;
  setIsStandalone: Dispatch<SetStateAction<boolean>>;
  showInstallButton: boolean;
  setShowInstallButton: Dispatch<SetStateAction<boolean>>;
  showIOSInstallModal: boolean;
  setShowIOSInstallModal: Dispatch<SetStateAction<boolean>>;
};

const INITIAL_STATE: PWAContextProps = {
  deferredPrompt: undefined,
  setDeferredPrompt: () => {},
  isStandalone: false,
  setIsStandalone: () => {},
  showInstallButton: false,
  setShowInstallButton: () => {},
  showIOSInstallModal: false,
  setShowIOSInstallModal: () => {},
};

export const PWAContext = createContext(INITIAL_STATE);

export const PWAProvider: React.FC = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>();
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [showInstallButton, setShowInstallButton] = useState<boolean>(false);
  const [showIOSInstallModal, setShowIOSInstallModal] =
    useState<boolean>(false);

  const preventSwipeEl = useRef<HTMLDivElement>(null);

  const preventDefaultSwipeNav = (e: any) => {
    // prevent swipe to navigate gesture on mobile Safari
    if (e.pageX > 10 && e.pageX < window.innerWidth - 10) return;
    e.preventDefault();
  };

  useEffect(() => {
    const element = preventSwipeEl.current;
    element?.addEventListener("touchstart", preventDefaultSwipeNav);

    return () => {
      element?.removeEventListener("touchstart", preventDefaultSwipeNav);
    };
  }, []);

  const contextValue: PWAContextProps = {
    deferredPrompt,
    setDeferredPrompt,
    isStandalone,
    setIsStandalone,
    showInstallButton,
    setShowInstallButton,
    showIOSInstallModal,
    setShowIOSInstallModal,
  };

  return (
    <PWAContext.Provider value={contextValue}>
      <div
        ref={preventSwipeEl}
        style={{
          width: "100%",
          height: "100%",
          // border: "solid 1px red",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      />

      {children}
    </PWAContext.Provider>
  );
};
