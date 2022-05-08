import React, { FC, useState } from "react";

import useRoutines from "../../hooks/useRoutines";
import useWorkouts from "../../hooks/useWorkouts";
import SelectRoutineModal from "../../components/modals/SelectRoutineModal";

import RoutineHeader from "./RoutineHeader";
import RoutineCarousel from "../../components/routine/RoutineCarousel";
import RoutineFallbackCard from "./RoutineFallbackCard";
import { CircularProgress, Box } from "@mui/material";

const CurrentRoutine: FC = () => {
  const [showRoutineSelect, setShowRoutineSelect] = useState(false);

  const { currentRoutineId, isLoading: isLoadingRoutines } = useRoutines();
  const { isLoading: isLoadingWorkouts } = useWorkouts();

  const isLoading = isLoadingRoutines || isLoadingWorkouts;

  const showCarousel = !!currentRoutineId && !isLoading;

  const showFallbackCard = !currentRoutineId && !isLoading;

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

      {showCarousel && <RoutineCarousel />}

      {showFallbackCard && (
        <RoutineFallbackCard onSelectClick={() => setShowRoutineSelect(true)} />
      )}
    </>
  );
};

export default CurrentRoutine;
