import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { NextPage } from "next";

import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { RouterPath } from "../resources/routes";

import { generateRandomId } from "../utilities/general/helpers";
import { isStandaloneOnMobileSafari } from "../utilities/pwaHelpers/checkStandaloneMode";

import { withPrivate } from "../context/AuthContext";
import { WorkoutExerciseEntry } from "../context/WorkoutsContext";

import useWorkouts from "../hooks/useWorkouts";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import {
  TextField,
  Paper,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import {
  AddRounded as AddIcon,
  DeleteOutlineRounded as DeleteIcon,
} from "@mui/icons-material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import ActionButton from "../components/buttons/ActionButton";
import ExerciseCard from "../components/cards/ExerciseCard";

const useStyles = makeStyles((theme: Theme) => ({
  saveButtonContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.palette.background.default,
    zIndex: 1100,
  },
  saveButton: {
    width: "100%",
    borderRadius: 0,
  },
  saveButtonLabel: {
    minHeight: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.9375rem",
  },
}));

const WorkoutEditor: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (isStandaloneOnMobileSafari()) setIsStandalone(true);
  }, []);

  const existingWorkoutId = router.query.workoutId;
  const isExistingWorkout = !!existingWorkoutId;

  const [workoutTitle, setWorkoutTitle] = useState("");

  const [workoutExerciseEntries, setWorkoutExerciseEntries] = useState<
    WorkoutExerciseEntry[]
  >([]); // the data that will be rendered on each exercise card

  // WORKOUT ----------------------
  const { createWorkout, getWorkoutById, updateWorkout } = useWorkouts();

  useEffect(() => {
    if (!existingWorkoutId) return;

    getWorkoutById(existingWorkoutId as string).then((data) => {
      if (!data) return;
      setWorkoutTitle(data.title || "");
      setWorkoutExerciseEntries(data.exercises || []);
    });
  }, [existingWorkoutId]);

  // EXERCISES ----------------------

  const onAddExerciseClick = () => {
    const newExercise = {
      id: generateRandomId(),
      name: "",
      reps: "",
      sets: "",
      videoUrl: "",
    };
    setWorkoutExerciseEntries([...workoutExerciseEntries, newExercise]);
  };

  const updateExerciseProperty = (
    position: number,
    property: string,
    value: number | string
  ) => {
    const updatedData: any = cloneDeep(workoutExerciseEntries);
    updatedData[position][property] = value;
    setWorkoutExerciseEntries(updatedData);
  };

  const removeExercise = (position: number) => {
    const updatedData: any = cloneDeep(workoutExerciseEntries);
    updatedData.splice(position, 1);
    setWorkoutExerciseEntries(updatedData);
  };

  const onSaveClick = async () => {
    await createWorkout({
      title: workoutTitle,
      exercises: workoutExerciseEntries,
    }).then(() => router.push(RouterPath.Workouts));
  };

  const onUpdateClick = async () => {
    if (!existingWorkoutId) return;
    await updateWorkout({
      id: existingWorkoutId as string,
      title: workoutTitle,
      exercises: workoutExerciseEntries,
    }).then(() => router.push(RouterPath.Workouts));
  };

  // Sortable functions
  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
    return {
      userSelect: "none",
      // styles we need to apply on draggables
      ...draggableStyle,
      opacity: isDragging ? 0.75 : 1,
    };
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const sortedEntries = reorder(
      workoutExerciseEntries,
      result.source.index,
      result.destination.index
    );

    setWorkoutExerciseEntries(sortedEntries);
  };

  return (
    <>
      {!!existingWorkoutId && <DeleteButton />}
      <MainContentWrapper>
        <TextField
          id="workout-title"
          type="text"
          label="Workout Title"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={workoutTitle}
          onChange={(e) => setWorkoutTitle(e.target.value)}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ width: "100%" }}
              >
                {workoutExerciseEntries.map((exercise, index) => (
                  <Draggable
                    key={exercise.id}
                    draggableId={exercise.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <ExerciseCard
                        key={"exercise" + index}
                        index={index}
                        exercise={exercise}
                        updateExerciseProperty={updateExerciseProperty}
                        removeExercise={removeExercise}
                        dragHandleProps={provided.dragHandleProps}
                        draggableProps={provided.draggableProps}
                        draggableRef={provided.innerRef}
                        draggableStyle={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <ActionButton
          label="Add exercise"
          onClick={onAddExerciseClick}
          sx={{ mb: 2 }}
          fullWidth
          endIcon={<AddIcon />}
        />

        <Paper square elevation={3} className={classes.saveButtonContainer}>
          <Button
            variant="contained"
            disableElevation
            className={classes.saveButton}
            sx={{
              p: 0,
              pb: isStandalone ? 3.5 : undefined,
            }}
            disabled={!workoutTitle || !workoutExerciseEntries.length}
            onClick={isExistingWorkout ? onUpdateClick : onSaveClick}
          >
            <Typography
              component="span"
              variant="button"
              className={classes.saveButtonLabel}
            >
              {isExistingWorkout ? "Update" : "Create"} Workout
            </Typography>
          </Button>
        </Paper>
      </MainContentWrapper>
    </>
  );
};

export default withPrivate(WorkoutEditor);

const DeleteButton = () => {
  const [headerToolbarElement, setHeaderToolbarElement] =
    useState<HTMLElement | null>();
  const router = useRouter();

  const { deleteWorkout } = useWorkouts();
  const existingWorkoutId = router.query.workoutId;

  useEffect(() => {
    const headerToolbar = document.getElementById("right-controls");
    setHeaderToolbarElement(headerToolbar);
  }, []);

  const onDeleteClick = () => {
    if (!existingWorkoutId) return;
    deleteWorkout(existingWorkoutId as string).then(() =>
      router.push(RouterPath.Workouts)
    );
  };

  return headerToolbarElement
    ? ReactDOM.createPortal(
        <IconButton color="error" onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>,
        headerToolbarElement
      )
    : null;
};
