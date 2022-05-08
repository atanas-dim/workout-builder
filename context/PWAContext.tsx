import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

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
    <PWAContext.Provider value={contextValue}>{children}</PWAContext.Provider>
  );
};
