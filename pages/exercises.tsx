import React, { useState, useEffect } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import { useAuth } from "../context/AuthContext";

import useExercizes from "../hooks/useExercizes";

//Using getServerSideProps to authenticate token for private routes
export { getServerSideProps } from "../utilities/ssrHelpers/authInServerSideProps";

export default function Exercises() {
  const [exercizeTitle, setExercizeTitle] = useState("");
  const { exercizesData, createExercize } = useExercizes();

  const onCreateClick = () => {
    if (!exercizeTitle) return;
    createExercize(exercizeTitle);
    setExercizeTitle("");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      style={{ maxWidth: 600, margin: "auto", padding: 80 }}
    >
      <TextField
        id="exercize-name"
        type="text"
        label="Exercize name"
        variant="outlined"
        sx={{ mb: 2 }}
        value={exercizeTitle}
        onChange={(e) => setExercizeTitle(e.target.value)}
      />
      <Button variant="contained" onClick={onCreateClick}>
        Create new exercise
      </Button>

      {exercizesData?.map((exercize) => {
        return (
          <Typography component="h2" variant="h4" key={exercize.id}>
            {exercize.title}
          </Typography>
        );
      })}
    </Box>
  );
}
