import React, { useState, useEffect, createContext, FC } from "react";

type OnlineStatusContextValue = {
  online: boolean;
};

const INITIAL_STATE = {
  online: true,
};

export const OnlineStatusContext =
  createContext<OnlineStatusContextValue>(INITIAL_STATE);

export const OnlineStatusProvider: FC = ({ children }) => {
  const [online, setOnline] = useState<boolean>(INITIAL_STATE.online);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnline(false);
    });
    window.addEventListener("online", () => {
      setOnline(true);
    });

    return () => {
      window.removeEventListener("offline", () => {
        setOnline(false);
      });
      window.removeEventListener("online", () => {
        setOnline(true);
      });
    };
  }, []);

  return (
    <OnlineStatusContext.Provider value={{ online }}>
      {children}
    </OnlineStatusContext.Provider>
  );
};
