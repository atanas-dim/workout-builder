export enum RouterPath {
  Training = "/",
  Workouts = "/workouts",
  WorkoutEditor = "/workout-editor",
  Welcome = "/welcome",
  Login = "/login",
  Register = "/register",
}

type RouteSettings = {
  bottomNavValue?: number;
  title: string;
  appBar: boolean;
};
export const ROUTE_SETTINGS: {
  [key in RouterPath]: RouteSettings;
} = {
  [RouterPath.Welcome]: { title: "Welcome", appBar: false },
  [RouterPath.Login]: { title: "Login", appBar: false },
  [RouterPath.Register]: { title: "Register", appBar: false },
  [RouterPath.Training]: {
    bottomNavValue: 0,
    title: "Training",
    appBar: true,
  },
  [RouterPath.Workouts]: {
    bottomNavValue: 1,
    title: "Workouts",
    appBar: true,
  },
  [RouterPath.WorkoutEditor]: {
    title: "Workout Editor",
    appBar: true,
  },
};
