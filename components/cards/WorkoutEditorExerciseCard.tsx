import React, { FC, useState, useEffect, useRef } from "react";

import useExercises from "../../hooks/useExercises";
import useWorkouts from "../../hooks/useWorkouts";
import { Exercise } from "../../context/ExercisesContext";
import { WorkoutExerciseEntry } from "../../context/WorkoutsContext";

import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

import {
  Box,
  Card,
  Typography,
  TextField,
  IconButton,
  Grow,
} from "@mui/material";
import {
  Cancel as DeleteIcon,
  DragIndicator as DragIcon,
} from "@mui/icons-material/";

enum ExerciseProperties {
  Sets = "sets",
  Reps = "reps",
}

type Props = {
  index: number;
  exercise: WorkoutExerciseEntry;

  updateExerciseProperty: (
    position: number,
    property: string,
    value: number | string
  ) => void;
  removeExercise: (position: number) => void;

  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
  draggableProps: DraggableProvidedDraggableProps;
  draggableRef: any;
  draggableStyle: any;
};

const WorkoutEditorExerciseCard: FC<Props> = ({
  index: position,
  exercise,
  updateExerciseProperty,
  removeExercise,
  dragHandleProps,
  draggableProps,
  draggableRef,
  draggableStyle,
}) => {
  const [reps, setReps] = useState<string | number>(0);
  const [sets, setSets] = useState<string | number>(0);
  const [exerciseDataById, setExerciseDataById] = useState<Exercise>();

  const { getWorkoutExerciseById } = useWorkouts();

  useEffect(() => {
    if (!exercise.id) return;
    getWorkoutExerciseById(exercise.id).then((data) => {
      setExerciseDataById(data);
    });
    setSets(exercise.sets);
    setReps(exercise.reps);
  }, [exercise]);

  const handleRepsChange = (value: string | number) => {
    setReps(value);
    updateExerciseProperty(position, ExerciseProperties.Reps, value);
  };

  const handleSetsChange = (value: string | number) => {
    setSets(value);
    updateExerciseProperty(position, ExerciseProperties.Sets, value);
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", mb: 2, p: 1 }}
      ref={draggableRef}
      {...draggableProps}
      style={draggableStyle}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mb: 2 }}
      >
        <IconButton {...dragHandleProps}>
          <DragIcon />
        </IconButton>
        <Typography
          component="h2"
          variant="h6"
          align="center"
          sx={{ mt: 1 / 2 }}
        >
          {exerciseDataById?.title}
        </Typography>
        <IconButton onClick={() => removeExercise(position)}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Box display="flex" sx={{ m: 1 }}>
        <TextField
          id={`${exercise.id}-sets`}
          type="text"
          label="Sets"
          variant="outlined"
          fullWidth
          sx={{ mr: 2 }}
          value={sets}
          onChange={(e) => handleSetsChange(e.target.value)}
        />
        <TextField
          id={`${exercise.id}-reps`}
          type="text"
          label="Reps"
          variant="outlined"
          fullWidth
          value={reps}
          onChange={(e) => handleRepsChange(e.target.value)}
        />
      </Box>
    </Card>
  );
};

export default WorkoutEditorExerciseCard;
