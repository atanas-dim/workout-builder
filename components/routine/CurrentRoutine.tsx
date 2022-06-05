import React, { FC, useState } from "react";

import useRoutines from "../../hooks/useRoutines";
import useWorkouts from "../../hooks/useWorkouts";
import SelectRoutineModal from "../../components/modals/SelectRoutineModal";

import RoutineHeader from "./RoutineHeader";
import RoutineCarousel from "../../components/routine/RoutineCarousel";
import RoutineFallbackCard from "./RoutineFallbackCard";
import { CircularProgress, Box } from "@mui/material";

import { FallbackCardVariant } from "./RoutineFallbackCard";

const CurrentRoutine: FC = () => {
  const [showRoutineSelect, setShowRoutineSelect] = useState(false);

  const {
    routines,
    currentRoutineId,
    isLoading: isLoadingRoutines,
  } = useRoutines();

  const {
    workouts,
    routineGroups,
    isLoading: isLoadingWorkouts,
  } = useWorkouts();

  const isLoading = isLoadingRoutines || isLoadingWorkouts;

  const currentRoutineWorkouts = currentRoutineId
    ? routineGroups?.[currentRoutineId]?.workouts
    : {};

  const showCarousel =
    currentRoutineWorkouts && !!Object.keys(currentRoutineWorkouts).length;

  const getFallbackCardVariant = () => {
    if (!workouts?.length) return FallbackCardVariant.FirstWorkout;
    else if (!routines?.length) return FallbackCardVariant.FirstRoutine;
    else if (!currentRoutineId) return FallbackCardVariant.SelectRoutine;
    else if (!Object.keys(currentRoutineWorkouts).length)
      return FallbackCardVariant.RoutineIsEmpty;
    else return FallbackCardVariant.SelectRoutine;
  };

  return (
    <>
      <RoutineHeader onSelectClick={() => setShowRoutineSelect(true)} />
      <SelectRoutineModal
        show={showRoutineSelect}
        hide={() => setShowRoutineSelect(false)}
      />

      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: 260 }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && (
        <>
          {showCarousel && (
            <RoutineCarousel workouts={currentRoutineWorkouts} />
          )}

          {!showCarousel && (
            <RoutineFallbackCard
              variant={getFallbackCardVariant()}
              onSelectClick={() => setShowRoutineSelect(true)}
              currentRoutineId={currentRoutineId}
            />
          )}
        </>
      )}
    </>
  );
};

export default CurrentRoutine;
