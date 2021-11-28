import React, { useState, useEffect } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import { useAuth } from "../context/AuthContext";

import useExercises from "../hooks/useExercises";

//Using getServerSideProps to authenticate token for private routes
export { getServerSideProps } from "../utilities/ssrHelpers/authInServerSideProps";

export default function Exercises() {
  const [exerciseTitle, setExerciseTitle] = useState("");
  const { exercisesData, createExercise } = useExercises();

  const onCreateClick = () => {
    if (!exerciseTitle) return;
    createExercise(exerciseTitle);
    setExerciseTitle("");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      style={{ maxWidth: 600, margin: "auto", padding: 80 }}
    >
      <TextField
        id="exercise-name"
        type="text"
        label="Exercise name"
        variant="outlined"
        sx={{ mb: 2 }}
        value={exerciseTitle}
        onChange={(e) => setExerciseTitle(e.target.value)}
      />
      <Button variant="contained" onClick={onCreateClick}>
        Create new exercise
      </Button>

      {exercisesData?.map((exercise) => {
        return (
          <Typography component="h2" variant="h4" key={exercise.id}>
            {exercise.title}
          </Typography>
        );
      })}
    </Box>
  );
}
