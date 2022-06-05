import React, { FC } from "react";

import { useRouter } from "next/router";

import { RouterPath } from "../../resources/routes";

import { Typography, Card } from "@mui/material/";
import ActionButton from "../../components/buttons/ActionButton";

export enum FallbackCardVariant {
  FirstWorkout,
  FirstRoutine,
  SelectRoutine,
  RoutineIsEmpty,
}

type Props = {
  variant: FallbackCardVariant;
  onSelectClick: () => void;
  currentRoutineId?: string;
};

const RoutineFallbackCard: FC<Props> = ({
  variant,
  onSelectClick,
  currentRoutineId,
}) => {
  const { push } = useRouter();

  const onCreateWorkoutClick = () => {
    push(RouterPath.WorkoutEditor);
  };

  const onCreateRoutineClick = () => {
    push(RouterPath.RoutineEditor);
  };

  const onAddWorkoutClick = () => {
    if (!currentRoutineId) return;
    push({
      pathname: RouterPath.RoutineEditor,
      query: { routineId: currentRoutineId },
    });
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: 320,
        p: 2,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {variant === FallbackCardVariant.FirstWorkout && (
        <>
          <Typography component="span" variant="h6" sx={{ mb: 2 }}>
            Create your first workout
          </Typography>
          <ActionButton label="Create workout" onClick={onCreateWorkoutClick} />
        </>
      )}

      {variant === FallbackCardVariant.FirstRoutine && (
        <>
          <Typography component="span" variant="h6" sx={{ mb: 2 }}>
            Create your first routine
          </Typography>
          <ActionButton label="Create routine" onClick={onCreateRoutineClick} />
        </>
      )}

      {variant === FallbackCardVariant.SelectRoutine && (
        <>
          <Typography component="span" variant="h6" sx={{ mb: 2 }}>
            To start training select a routine
          </Typography>
          <ActionButton label="Select routine" onClick={onSelectClick} />
        </>
      )}

      {variant === FallbackCardVariant.RoutineIsEmpty && (
        <>
          <Typography component="span" variant="h6" sx={{ mb: 2 }}>
            Selected routine is empty
          </Typography>
          <ActionButton label="Add workout" onClick={onAddWorkoutClick} />
        </>
      )}
    </Card>
  );
};

export default RoutineFallbackCard;
