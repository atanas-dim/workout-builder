import "../styles/globals.css";

import { useRouter } from "next/router";

import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";

import { ThemeProvider } from "@mui/material/styles";
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

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          {ROUTE_VALUES[router.asPath]?.appBar && <Header />}
          <Component {...pageProps} />
          {ROUTE_VALUES[router.asPath]?.bottomNavValue !== undefined && (
            <BottomNav />
          )}
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
