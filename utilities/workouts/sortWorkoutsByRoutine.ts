import { Routine } from "../../context/RoutinesContext";
import { Workout, RoutineGroup } from "../../context/WorkoutsContext";
import { Timestamp } from "firebase/firestore";

// Create object with initial routines data grouped by routine Id
const createRoutineGroups = (routinesData: Routine[]) => {
  const routineGroups: {
    [key: string]: RoutineGroup;
  } = {
    unsorted: {
      id: undefined,
      title: "Unsorted",
      workouts: [],
      workoutsOrder: [],
      updated: Timestamp.fromDate(new Date(0, 0, 0)),
    },
  };

  routinesData.forEach((routine) => {
    const newGroup: RoutineGroup = {
      id: routine.id,
      title: routine.title,
      workouts: [],
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
  return workouts.sort(
    (a, b) => orderArray.indexOf(a.id) - orderArray.indexOf(b.id)
  );
};

const getUnsortedWorkouts = (
  workouts: Workout[],
  addedToRoutines: string[]
) => {
  return workouts.filter((workout) => !addedToRoutines.includes(workout.id));
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

    for (
      let workoutIndex = workoutsData.length - 1;
      workoutIndex >= 0;
      workoutIndex--
    ) {
      const workout = workoutsData[workoutIndex];

      if (routineGroup.workoutsOrder.includes(workout.id)) {
        routineGroup.workouts.push(workout);
        addedToRoutines.push(workout.id);
      }
    }

    routineGroup.workouts = sortWorkoutsByOrderArray(
      routineGroup.workouts,
      routineGroup.workoutsOrder
    );
  }

  routineGroups.unsorted.workouts = getUnsortedWorkouts(
    workoutsData,
    addedToRoutines
  );

  return routineGroups;
};
