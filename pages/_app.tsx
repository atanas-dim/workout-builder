import "../styles/globals.css";

import { useState, useEffect, FC } from "react";

import { useRouter } from "next/router";

import { AppProps } from "next/app";

import { AuthProvider } from "../context/AuthContext";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { CssBaseline } from "@mui/material/";
import theme from "../styles/theme";

import Header from "../components/header/Header";
import BottomNav from "../components/bottomNav/BottomNav";

export enum RouterPaths {
  Training = "/",
  Workouts = "/workouts",
  Exercises = "/exercises",
  Welcome = "/welcome",
  Login = "/login",
  Register = "/register",
}

export const ROUTE_VALUES: {
  [key: string]: { bottomNavValue?: number; title: string; appBar: boolean };
} = {
  [RouterPaths.Training]: {
    bottomNavValue: 0,
    title: "Training",
    appBar: true,
  },
  [RouterPaths.Workouts]: {
    bottomNavValue: 1,
    title: "Workouts",
    appBar: true,
  },
  [RouterPaths.Exercises]: {
    bottomNavValue: 2,
    title: "Exercises",
    appBar: true,
  },
  [RouterPaths.Welcome]: { title: "Welcome", appBar: false },
  [RouterPaths.Login]: { title: "Login", appBar: false },
  [RouterPaths.Register]: { title: "Register", appBar: false },
};

const SafeHydrate: FC = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Disabling SSR for the app content to speed up loading time and avoid longer waiting with blank screen on mobile */}
          {/* Most data is fetched from Firebase client side */}
          <SafeHydrate>
            <AuthProvider>
              {ROUTE_VALUES[router.asPath]?.appBar && <Header />}
              <Component {...pageProps} />
              {ROUTE_VALUES[router.asPath]?.bottomNavValue !== undefined && (
                <BottomNav />
              )}
            </AuthProvider>
          </SafeHydrate>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default MyApp;
