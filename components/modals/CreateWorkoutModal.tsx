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
    outline: "none !important",
  },
}));

type Props = {
  showModal: boolean;
  hideModal: () => void;
  createWorkout: (workoutTitle: string) => Promise<void>;
};

const CreateWorkoutModal: FC<Props> = ({
  showModal,
  hideModal,
  createWorkout,
}) => {
  const classes = useStyles();
  const [workoutTitle, setWorkoutTitle] = useState("");

  const onCreateClick = () => {
    if (!workoutTitle) return;
    createWorkout(workoutTitle);
    setWorkoutTitle("");
    hideModal();
  };

  const handleClose = () => {
    setWorkoutTitle("");
    hideModal();
  };

  return (
    <Modal open={showModal} onClose={handleClose} className={classes.root}>
      <Card elevation={3} className={classes.card} variant="outlined">
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 4 }}>
          New workout
        </Typography>
        <TextField
          id="workout-name"
          type="text"
          label="Workout Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={workoutTitle}
          onChange={(e) => setWorkoutTitle(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={onCreateClick}
          sx={{ mt: 2, height: 48 }}
        >
          Create workout
        </Button>
      </Card>
    </Modal>
  );
};

export default CreateWorkoutModal;
