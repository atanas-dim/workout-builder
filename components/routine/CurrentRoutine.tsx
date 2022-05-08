import React, { FC, useState } from "react";

import useRoutines from "../../hooks/useRoutines";
import useWorkouts from "../../hooks/useWorkouts";
import SelectRoutineModal from "../../components/modals/SelectRoutineModal";

import RoutineHeader from "./RoutineHeader";
import RoutineCarousel from "../../components/routine/RoutineCarousel";
import RoutineFallbackCard from "./RoutineFallbackCard";

const CurrentRoutine: FC = () => {
  const [showRoutineSelect, setShowRoutineSelect] = useState(false);

  const { currentRoutineId, isLoading: isLoadingRoutines } = useRoutines();
  const { isLoading: isLoadingWorkouts } = useWorkouts();

  const showCarousel =
    !!currentRoutineId && !isLoadingRoutines && !isLoadingWorkouts;

  const showFallbackCard =
    !currentRoutineId && !isLoadingRoutines && !isLoadingWorkouts;

  return (
    <>
      <RoutineHeader onSelectClick={() => setShowRoutineSelect(true)} />
      <SelectRoutineModal
        show={showRoutineSelect}
        hide={() => setShowRoutineSelect(false)}
      />

      {showCarousel && <RoutineCarousel />}

      {showFallbackCard && (
        <RoutineFallbackCard onSelectClick={() => setShowRoutineSelect(true)} />
      )}
    </>
  );
};

export default CurrentRoutine;
