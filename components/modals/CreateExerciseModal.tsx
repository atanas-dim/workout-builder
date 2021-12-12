import React, { FC, useState } from "react";
import { Modal, Card, Typography, TextField, Button } from "@mui/material";
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
    padding: theme.spacing(3, 2),
    width: "100%",
    maxWidth: theme.breakpoints.values.sm,
    "&:focus-visible": {
      outline: "none",
    },
  },
}));

type Props = {
  showModal: boolean;
  hideModal: () => void;
  createExercise: (exerciseTitle: string) => Promise<void>;
};

export const CreateExerciseModal: FC<Props> = ({
  showModal,
  hideModal,
  createExercise,
}) => {
  const classes = useStyles();
  const [exerciseTitle, setExerciseTitle] = useState("");

  const onCreateClick = () => {
    if (!exerciseTitle) return;
    createExercise(exerciseTitle);
    setExerciseTitle("");
    hideModal();
  };

  const handleClose = () => {
    setExerciseTitle("");
    hideModal();
  };

  return (
    <Modal open={showModal} onClose={handleClose} className={classes.root}>
      <Card elevation={3} className={classes.card} variant="outlined">
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          New exercise
        </Typography>
        <TextField
          id="exercise-name"
          type="text"
          label="Exercise name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={exerciseTitle}
          onChange={(e) => setExerciseTitle(e.target.value)}
        />
        <Button
          variant="contained"
          // color="secondary"
          fullWidth
          onClick={onCreateClick}
          sx={{ height: 48 }}
        >
          Create exercise
        </Button>
      </Card>
    </Modal>
  );
};

export default CreateExerciseModal;
