import React, { FC } from "react";

import { useRouter } from "next/router";

import { RouterPath } from "../../resources/routes";

import useRoutines from "../../hooks/useRoutines";
import useWorkouts from "../../hooks/useWorkouts";

import { Typography, Card } from "@mui/material/";
import ActionButton from "../../components/buttons/ActionButton";

type Props = {
  onSelectClick: () => void;
};

const RoutineFallbackCard: FC<Props> = ({ onSelectClick }) => {
  const { push } = useRouter();

  const { routines } = useRoutines();
  const { workouts } = useWorkouts();

  const onCreateWorkoutClick = () => {
    push(RouterPath.WorkoutEditor);
  };

  const onCreateRoutineClick = () => {
    push(RouterPath.RoutineEditor);
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
      {!workouts.length ? (
        <>
          <Typography component="span" variant="h6" sx={{ mb: 2 }}>
            Create your first workout
          </Typography>
          <ActionButton label="Create workout" onClick={onCreateWorkoutClick} />
        </>
      ) : !routines.length ? (
        <>
          <Typography component="span" variant="h6" sx={{ mb: 2 }}>
            Create your first routine
          </Typography>
          <ActionButton label="Create routine" onClick={onCreateRoutineClick} />
        </>
      ) : (
        <>
          <Typography component="span" variant="h6" sx={{ mb: 2 }}>
            To start training select a routine
          </Typography>
          <ActionButton label="Select routine" onClick={onSelectClick} />
        </>
      )}
    </Card>
  );
};

export default RoutineFallbackCard;
