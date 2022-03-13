import { NextPage } from "next";
import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { RouterPath } from "../resources/routes";
import { isStandaloneOnMobileSafari } from "../utilities/pwaHelpers/checkStandaloneMode";

import { withAuth } from "../context/AuthContext";
import { WorkoutExerciseEntry } from "../context/WorkoutsContext";
import { Routine } from "../context/RoutinesContext";

import useWorkouts from "../hooks/useWorkouts";
import useRoutines from "../hooks/useRoutines";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import {
  TextField,
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  Autocomplete,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import {
  Add as AddIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";

import { Timestamp } from "firebase/firestore";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import ActionButton from "../components/buttons/ActionButton";
import ExerciseCard from "../components/cards/ExerciseCard";

const useStyles = makeStyles((theme: Theme) => ({
  saveButtonContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: `solid 1px ${theme.palette.divider}`,
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

const generateExerciseId = (prefix: string = "") => {
  return Math.random().toString(36).replace("0.", prefix);
};

type Override<T1, T2> = Omit<T1, keyof T2> & T2; // move to helpers
type RoutineOption = Override<
  Routine,
  { inputValue: string; id?: string; created?: Timestamp }
>;

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

  const { routinesData, createRoutine } = useRoutines();
  const [showNewRoutineDialog, setShowNewRoutineDialog] = useState(false);

  const [selectedRoutineId, setSelectedRoutineId] = useState("");
  const [routineTitle, setRoutineTitle] = useState("");
  const [indexInRoutine, setIndexInRoutine] = useState("");

  // WORKOUT ----------------------
  const { workoutsData, createWorkout, getWorkoutById, updateWorkout } =
    useWorkouts();

  useEffect(() => {
    if (existingWorkoutId) {
      getWorkoutById(existingWorkoutId as string).then((data) => {
        if (!data) return;
        setWorkoutTitle(data.title || "");
        setWorkoutExerciseEntries(data.exercises || []);

        const routineId =
          routinesData?.find((routine) => routine.id === data.routineId)?.id ||
          "";
        setSelectedRoutineId(routineId);

        const routineTitle =
          routinesData?.find((routine) => routine.id === data.routineId)
            ?.title || "";
        setRoutineTitle(routineTitle);

        setIndexInRoutine(data.indexInRoutine);
      });
    }
  }, [router]);

  // ROUTINE ----------------------

  const onNewRoutineSubmit = async (e: any) => {
    e.preventDefault();
    await createRoutine(routineTitle).then((id) => {
      setSelectedRoutineId(id || "");
      setShowNewRoutineDialog(false);
    });
  };

  const routinesFilter = createFilterOptions<RoutineOption>();

  const createRoutineOptions: () => RoutineOption[] = useCallback(() => {
    return routinesData.map((routine) => {
      return { ...routine, inputValue: routine.title };
    });
  }, [routinesData]);

  const onRoutineChange = (
    event: any,
    newValue: string | RoutineOption | null
  ) => {
    if (!newValue) {
      setSelectedRoutineId("");
      setRoutineTitle("");
      setIndexInRoutine("");
      return;
    }

    if (typeof newValue === "string") {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        setShowNewRoutineDialog(true);
        setRoutineTitle(newValue);
      });
    } else if (!newValue.id) {
      setShowNewRoutineDialog(true);
      setRoutineTitle(newValue.title);
    } else {
      setRoutineTitle(newValue.title);
      setSelectedRoutineId(newValue.id);

      const nextIndexOnRoutine =
        workoutsData.filter((workout) => workout.routineId === newValue.id)
          ?.length + 1;

      setIndexInRoutine(nextIndexOnRoutine.toString());
    }
  };

  // EXERCISES ----------------------
  const onAddExerciseClick = () => {
    const newExercise = {
      id: generateExerciseId(),
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
      routineId: selectedRoutineId,
      indexInRoutine: workoutsData
        .filter((workout) => workout.routineId === selectedRoutineId)
        ?.length.toString(),
      exercises: workoutExerciseEntries,
    }).then(() => router.push(RouterPath.Workouts));
  };

  const onUpdateClick = async () => {
    if (!existingWorkoutId) return;
    await updateWorkout({
      id: existingWorkoutId as string,
      routineId: selectedRoutineId,
      indexInRoutine,
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
        <Autocomplete
          value={routineTitle}
          onChange={onRoutineChange}
          filterOptions={(options, params) => {
            const filtered = routinesFilter(options, params);
            if (params.inputValue !== "") {
              filtered.unshift({
                inputValue: `Add "${params.inputValue}"`,
                title: params.inputValue,
              });
            }
            return filtered;
          }}
          id="routine-input"
          options={createRoutineOptions()}
          getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            return option.inputValue;
          }}
          selectOnFocus
          handleHomeEndKeys
          renderOption={(props, option) => {
            return <li {...props}>{option.inputValue}</li>;
          }}
          sx={{ mb: 2 }}
          freeSolo
          clearOnBlur
          fullWidth
          renderInput={(params) => <TextField {...params} label="Routine" />}
        />

        <Dialog
          open={showNewRoutineDialog}
          onClose={() => setShowNewRoutineDialog(false)}
          sx={{ width: "100%" }}
        >
          <Box
            component="form"
            onSubmit={onNewRoutineSubmit}
            sx={{ width: "100%" }}
          >
            <DialogTitle sx={{ textAlign: "center" }}>New Routine</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="new-routine-title"
                value={routineTitle}
                onChange={(event) => setRoutineTitle(event.target.value)}
                label="Routine Title"
                type="text"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between" }}>
              <Button onClick={() => setShowNewRoutineDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </Box>
        </Dialog>

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

        <Paper square elevation={0} className={classes.saveButtonContainer}>
          <Button
            variant="contained"
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

export default withAuth(WorkoutEditor);

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
