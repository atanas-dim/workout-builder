import { Routine } from "../../context/RoutinesContext";
import {
  Workout,
  WorkoutExtended,
  RoutineGroup,
} from "../../context/WorkoutsContext";
import { Timestamp } from "firebase/firestore";

// Create object with initial routines data grouped by routine Id
const createRoutineGroups = (routinesData: Routine[]) => {
  const routineGroups: {
    [key: string]: RoutineGroup;
  } = {
    unsorted: {
      id: undefined,
      title: "Unsorted",
      workouts: {},
      workoutsOrder: [],
      updated: Timestamp.fromDate(new Date(0, 0, 0)),
    },
  };

  routinesData.forEach((routine) => {
    const newGroup: RoutineGroup = {
      id: routine.id,
      title: routine.title,
      workouts: {},
      workoutsOrder: routine?.workouts || [],
      updated: routine.updated || routine.created,
    };

    routineGroups[routine.id] = newGroup;
  });

  return routineGroups;
};

//  Sort workouts objects by order of workout IDs from routine data
export const sortWorkoutsByOrderArray = (
  workouts: Workout[],
  orderArray: string[]
) => {
  const ordered: Workout[] = [];
  orderArray.forEach((workoutId) => {
    const foundWorkout = workouts.find((workout) => workout.id === workoutId);
    if (foundWorkout) ordered.push(foundWorkout);
  });
  return ordered;
};

const getUnsortedWorkouts = (
  workouts: WorkoutExtended[],
  addedToRoutines: string[]
) => {
  const unsorted: { [key: string]: Workout } = {};
  workouts.forEach((workout, index) => {
    if (addedToRoutines.includes(workout.id)) return;
    unsorted[index.toString()] = workout;
  });

  return unsorted;
};

export const sortWorkoutsByRoutine = (
  routinesData: Routine[],
  workoutsData: Workout[]
) => {
  const routineGroups: {
    [key: string]: RoutineGroup;
  } = createRoutineGroups(routinesData);

  const addedToRoutines: string[] = [];

  for (
    let groupIndex = Object.keys(routineGroups).length - 1;
    groupIndex >= 0;
    groupIndex--
  ) {
    const groupKey = Object.keys(routineGroups)[groupIndex];
    const routineGroup = routineGroups[groupKey];

    const { workoutsOrder } = routineGroup;

    workoutsOrder.forEach((workoutOrderEntry, index) => {
      const workout = workoutsData.find(
        (workout) => workout.id === workoutOrderEntry.id
      );
      if (workout) {
        routineGroup.workouts[index] = {
          ...workout,
          orderId: workoutOrderEntry.orderId,
        };
        addedToRoutines.push(workoutOrderEntry.id);
      }
    });
  }

  routineGroups.unsorted.workouts = getUnsortedWorkouts(
    workoutsData,
    addedToRoutines
  );

  return routineGroups;
};
