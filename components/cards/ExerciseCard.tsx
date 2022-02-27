import React, { FC, useState, useEffect } from "react";

import { WorkoutExerciseEntry } from "../../context/WorkoutsContext";

import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

import {
  Box,
  Card,
  TextField,
  IconButton,
  // InputAdornment,
} from "@mui/material";
import {
  Cancel as DeleteIcon,
  DragIndicator as DragIcon,
  // Search as SearchIcon,
} from "@mui/icons-material/";

enum ExerciseProperties {
  Name = "name",
  Sets = "sets",
  Reps = "reps",
  VideoUrl = "videoUrl",
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

const ExerciseCard: FC<Props> = ({
  index: position,
  exercise,
  updateExerciseProperty,
  removeExercise,
  dragHandleProps,
  draggableProps,
  draggableRef,
  draggableStyle,
}) => {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (!exercise) return;

    setName(exercise.name);
    setSets(exercise.sets);
    setReps(exercise.reps);
    setVideoUrl(exercise.videoUrl);
  }, [exercise]);

  const handleNameChange = (value: string) => {
    setName(value);
    updateExerciseProperty(position, ExerciseProperties.Name, value);
  };

  const handleRepsChange = (value: string) => {
    setReps(value);
    updateExerciseProperty(position, ExerciseProperties.Reps, value);
  };

  const handleSetsChange = (value: string) => {
    setSets(value);
    updateExerciseProperty(position, ExerciseProperties.Sets, value);
  };

  const handleVideoUrlChange = (value: string) => {
    setVideoUrl(value);
    updateExerciseProperty(position, ExerciseProperties.VideoUrl, value);
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
      >
        <Box sx={{ flex: 1 }} {...dragHandleProps}>
          <IconButton>
            <DragIcon />
          </IconButton>
        </Box>

        <IconButton onClick={() => removeExercise(position)}>
          <DeleteIcon />
        </IconButton>
      </Box>

      <Box sx={{ m: 1 }}>
        <TextField
          id={`${exercise.id}-name`}
          type="text"
          label="Name"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <Box display="flex" sx={{ mb: 2 }}>
          <TextField
            id={`${exercise.id}-sets`}
            type="text"
            label="Sets"
            variant="outlined"
            size="small"
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
            size="small"
            fullWidth
            value={reps}
            onChange={(e) => handleRepsChange(e.target.value)}
          />
        </Box>

        <TextField
          id={`${exercise.id}-video-url`}
          type="text"
          label="YouTube Video URL"
          variant="outlined"
          size="small"
          fullWidth
          value={videoUrl}
          onChange={(e) => handleVideoUrlChange(e.target.value)}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start" sx={{ opacity: 0.5 }}>
          //       <SearchIcon />
          //     </InputAdornment>
          //   ),
          // }}
        />
      </Box>
    </Card>
  );
};

export default ExerciseCard;
