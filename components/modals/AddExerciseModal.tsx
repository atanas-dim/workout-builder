import React, { FC, useState, useEffect, useCallback } from "react";

import useExercises, { Exercise } from "../../hooks/useExercises";

import {
  Modal,
  Card,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Paper,
} from "@mui/material";
import {
  Cancel as CloseIcon,
  Search as SearchIcon,
} from "@mui/icons-material/";

import ExerciseCard from "../cards/ExerciseCard";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2, 2, 4),
    backgroundColor: alpha(theme.palette.background.default, 0.8),
  },
  card: {
    height: "100%",
    width: "100%",
    padding: theme.spacing(2),
    maxWidth: theme.breakpoints.values.sm,
    outline: "none !important",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  resultsContainer: {
    overflowY: "scroll",
    padding: "0 4px",
    msOverflowStyle: "none", // IE 10+
    overflow: "-moz-scrollbars-none", // Firefox
    "&::-webkit-scrollbar": {
      width: 10,
      background: theme.palette.background.default,
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#ffffff32",
      boxShadow: `inset 0 0 0 2px ${theme.palette.background.paper}`,
    },
  },
}));

type Props = {
  showModal: boolean;
  hideModal: () => void;
  addExercise: (exerciseId: string) => void;
};

const AddExerciseModal: FC<Props> = ({ showModal, hideModal, addExercise }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Exercise[]>();
  const { exercisesData, isLoading } = useExercises();

  const filterExercisesData = useCallback(() => {
    if (!exercisesData.length) return;
    return exercisesData.filter((exercise) =>
      exercise?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [exercisesData, searchTerm]);

  useEffect(() => {
    const results = filterExercisesData();
    setSearchResults(results);
  }, [searchTerm, filterExercisesData]);

  const handleAddClick = (exerciseId: string) => {
    addExercise(exerciseId);
    setSearchTerm("");
    hideModal();
  };

  const handleClose = () => {
    setSearchTerm("");
    hideModal();
  };

  return (
    <Modal open={showModal} onClose={handleClose} className={classes.root}>
      <Card className={classes.card} variant="outlined">
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{ mt: 0.5, mb: 4 }}
        >
          Add Exercise
        </Typography>
        <TextField
          id="find-exercise"
          type="text"
          label="Find Exercise"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ opacity: 0.5 }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={{ mb: 2 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box
          display="flex"
          flexDirection="column"
          className={classes.resultsContainer}
        >
          {searchResults &&
            searchResults.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                handleAddClick={handleAddClick}
              />
            ))}
        </Box>
      </Card>
    </Modal>
  );
};

export default AddExerciseModal;
