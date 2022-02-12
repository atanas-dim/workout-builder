import "../styles/globals.css";

import { useRouter } from "next/router";

import { AppProps } from "next/app";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { AuthProvider } from "../context/AuthContext";
import { ExercisesProvider } from "../context/ExercisesContext";
import { WorkoutsProvider } from "../context/WorkoutsContext";

import { CssBaseline } from "@mui/material/";
import theme from "../styles/theme";

import Header from "../components/header/Header";
import BottomNav from "../components/bottomNav/BottomNav";

export enum RouterPath {
  Training = "/",
  Workouts = "/workouts",
  WorkoutEditor = "/workout-editor",
  Exercises = "/exercises",
  Welcome = "/welcome",
  Login = "/login",
  Register = "/register",
}

type RouteValues = {
  bottomNavValue?: number;
  title: string;
  appBar: boolean;
  private: boolean;
};
export const ROUTE_VALUES: {
  [key in RouterPath]: RouteValues;
} = {
  [RouterPath.Welcome]: { title: "Welcome", appBar: false, private: false },
  [RouterPath.Login]: { title: "Login", appBar: false, private: false },
  [RouterPath.Register]: { title: "Register", appBar: false, private: false },
  [RouterPath.Training]: {
    bottomNavValue: 0,
    title: "Training",
    appBar: true,
    private: true,
  },
  [RouterPath.Workouts]: {
    bottomNavValue: 1,
    title: "Workouts",
    appBar: true,
    private: true,
  },
  [RouterPath.Exercises]: {
    bottomNavValue: 2,
    title: "Exercises",
    appBar: true,
    private: true,
  },
  [RouterPath.WorkoutEditor]: {
    title: "Workout Editor",
    appBar: true,
    private: true,
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <AuthProvider>
            <ExercisesProvider>
              <WorkoutsProvider>
                {ROUTE_VALUES[router.pathname as RouterPath]?.appBar && (
                  <Header />
                )}
                <Component {...pageProps} />
                {ROUTE_VALUES[router.pathname as RouterPath]?.bottomNavValue !==
                  undefined && <BottomNav />}
              </WorkoutsProvider>
            </ExercisesProvider>
          </AuthProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default MyApp;
