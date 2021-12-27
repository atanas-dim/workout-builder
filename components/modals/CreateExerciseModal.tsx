import React, { FC, useState, useEffect } from "react";

import { Exercise } from "../../hooks/useExercises";

import {
  Modal,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import {
  Cancel as CloseIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material/";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.background.default, 0.8),
  },
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    width: "100%",
    maxWidth: theme.breakpoints.values.sm,
    outline: "none !important",
    position: "relative",
  },
}));

type Props = {
  showModal: boolean;
  hideModal: () => void;
  createExercise: (exerciseTitle: string, youTubeUrl: string) => Promise<void>;
  selectedExerciseId: string;
  getExerciseById: (exerciseId: string) => Promise<Exercise>;
  updateExercise: (
    exerciseId: string,
    exerciseTitle: string,
    youTubeUrl: string
  ) => Promise<void>;
  deleteExercise: (exerciseId: string) => Promise<void>;
};

export const CreateExerciseModal: FC<Props> = ({
  showModal,
  hideModal,
  createExercise,
  selectedExerciseId,
  getExerciseById,
  updateExercise,
  deleteExercise,
}) => {
  const classes = useStyles();
  const [exerciseTitle, setExerciseTitle] = useState("");
  const [youTubeUrl, setYouTubeUrl] = useState<string>("");

  useEffect(() => {
    if (!selectedExerciseId) return;
    getExerciseById(selectedExerciseId).then((data) => {
      if (!data.title) return;
      setExerciseTitle(data.title);
      setYouTubeUrl(data.youTubeUrl || "");
    });
  }, [selectedExerciseId]);

  const onCreateClick = () => {
    if (!exerciseTitle) return;
    createExercise(exerciseTitle, youTubeUrl).then(() => closeModal());
  };

  const onUpdateClick = () => {
    if (!exerciseTitle) return;
    updateExercise(selectedExerciseId, exerciseTitle, youTubeUrl).then(() =>
      closeModal()
    );
  };

  const onDeleteClick = () => {
    deleteExercise(selectedExerciseId);
    closeModal();
  };

  const closeModal = () => {
    clearStateValues();
    hideModal();
  };

  const clearStateValues = () => {
    setExerciseTitle("");
    setYouTubeUrl("");
  };

  return (
    <Modal open={showModal} onClose={closeModal} className={classes.root}>
      <Card className={classes.card} variant="outlined">
        {selectedExerciseId && (
          <IconButton
            color="error"
            sx={{ position: "absolute", top: 16, left: 16 }}
            onClick={onDeleteClick}
          >
            <DeleteIcon />
          </IconButton>
        )}

        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={closeModal}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          component="h1"
          variant="h5"
          align="center"
          sx={{ mt: 0.5, mb: 4 }}
        >
          {selectedExerciseId ? "Edit" : "New"} exercise
        </Typography>

        <TextField
          id="exercise-title"
          type="text"
          label="Exercise Title"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={exerciseTitle}
          onChange={(e) => setExerciseTitle(e.target.value)}
        />
        <TextField
          id="video-url"
          type="text"
          label="YouTube Video URL"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={youTubeUrl}
          onChange={(e) => setYouTubeUrl(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={!selectedExerciseId ? onCreateClick : onUpdateClick}
          disabled={!exerciseTitle}
          sx={{ mt: 2, height: 48 }}
        >
          {selectedExerciseId ? "Update" : "Create"} exercise
        </Button>
      </Card>
    </Modal>
  );
};

export default CreateExerciseModal;
