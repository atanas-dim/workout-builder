import React, { FC, useState, useEffect } from "react";

import { cloneDeep } from "lodash";

import { useRouter } from "next/router";
import { RouterPaths } from "./_app";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { isStandaloneOnMobileSafari } from "../utilities/pwaHelpers/checkStandaloneMode";

import useWorkouts, { WorkoutExerciseEntry } from "../hooks/useWorkouts";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

import {
  TextField,
  Paper,
  ButtonBase,
  Typography,
  Button,
} from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import ActionButton from "../components/buttons/ActionButton";
import AddExerciseModal from "../components/modals/AddExerciseModal";
import WorkoutEditorExerciseCard from "../components/cards/WorkoutEditorExerciseCard";

export const useStyles = makeStyles((theme: Theme) => ({
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
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    "&:disabled": {
      backgroundColor: alpha(theme.palette.grey[200], 0.08),
    },
  },
  saveButtonLabel: {
    minHeight: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

//Using getServerSideProps to authenticate token for private routes
export { getServerSideProps } from "../utilities/ssrHelpers/authInServerSideProps";

const WorkoutEditor: FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [workoutExerciseEntries, setWorkoutExerciseEntries] = useState<
    WorkoutExerciseEntry[]
  >([]); // the data that will be rendered on each exercise card
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const { createWorkout } = useWorkouts();

  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (isStandaloneOnMobileSafari()) setIsStandalone(true);
  }, []);

  const addExercise = (exerciseId: string) => {
    const newExercise = {
      draggableId: workoutExerciseEntries.length.toString(),
      id: exerciseId,
      reps: 1,
      sets: 1,
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
    await createWorkout(workoutTitle, workoutExerciseEntries);
    router.push(RouterPaths.Workouts);
  };

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
                  key={exercise.draggableId}
                  draggableId={exercise.draggableId}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <WorkoutEditorExerciseCard
                      key={"exercise" + index}
                      position={index}
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
        size="large"
        label="Add exercise"
        onClick={() => setShowAddExerciseModal(true)}
        sx={{ mb: 2 }}
        fullWidth
        endIcon={<AddIcon />}
      />
      <AddExerciseModal
        showModal={showAddExerciseModal}
        hideModal={() => setShowAddExerciseModal(false)}
        addExercise={addExercise}
      />

      <Paper square elevation={0} className={classes.saveButtonContainer}>
        <Button
          className={classes.saveButton}
          sx={{
            p: 0,
            pb: isStandalone ? 3.5 : undefined,
          }}
          disabled={!workoutTitle || !workoutExerciseEntries.length}
          onClick={onSaveClick}
        >
          <Typography
            component="span"
            variant="button"
            className={classes.saveButtonLabel}
          >
            Save Workout
          </Typography>
        </Button>
      </Paper>
    </MainContentWrapper>
  );
};

export default WorkoutEditor;
