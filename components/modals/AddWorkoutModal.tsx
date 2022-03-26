import React, { FC, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

import {
  Modal,
  Card,
  Typography,
  TextField,
  Autocomplete,
  Paper,
} from "@mui/material";

import useWorkouts from "../../hooks/useWorkouts";
import ActionButton from "../buttons/ActionButton";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.background.default, 0.8),
  },
  card: {
    margin: theme.spacing(2, 2, 4),
    padding: theme.spacing(2, 3, 3, 3),
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: "visible",
    maxWidth: theme.breakpoints.values.sm,
    outline: "none !important",
    position: "relative",
  },
}));

type Props = {
  show: boolean;
  hide: () => any;
  onAddClick: (workoutId: string) => void;
};

const AddWorkoutModal: FC<Props> = ({ show, hide, onAddClick }) => {
  const classes = useStyles();

  const { workoutsData } = useWorkouts();

  const [selectedWorkout, setSelectedWorkout] = useState<{
    label: string;
    id: string;
  }>();

  const onAutoCompleteChange = (event: React.SyntheticEvent, value: any) => {
    if (!value || !value.id) setSelectedWorkout(undefined);
    else setSelectedWorkout(value);
  };

  const options = workoutsData.map((workout) => ({
    label: workout.title,
    id: workout.id,
  }));

  const handleAddClick = () => {
    if (!selectedWorkout) return;
    onAddClick(selectedWorkout.id);
    setSelectedWorkout(undefined);
    hide();
  };

  return (
    <Modal open={show} onClose={hide} className={classes.root}>
      <Card className={classes.card} elevation={1}>
        <Typography
          component="span"
          variant="h6"
          align="center"
          sx={{ mt: 0.5, mb: 4 }}
        >
          Add workout
        </Typography>
        <Autocomplete
          disablePortal
          id="add-workout-autocomplete"
          options={options}
          onChange={onAutoCompleteChange}
          fullWidth
          PaperComponent={(props) => {
            return <Paper elevation={3} {...props} />;
          }}
          renderInput={(params) => <TextField {...params} label="Workouts" />}
          isOptionEqualToValue={(option: any, value: any) =>
            option.label === value.label && option.id === value.id
          }
          sx={{ mb: 4 }}
        />
        <ActionButton
          label="Add"
          variant="contained"
          disabled={!selectedWorkout}
          onClick={handleAddClick}
        />
      </Card>
    </Modal>
  );
};

export default AddWorkoutModal;
