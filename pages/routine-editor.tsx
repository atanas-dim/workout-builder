import { NextPage } from "next";
import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { RouterPath } from "../resources/routes";
import { isStandaloneOnMobileSafari } from "../utilities/pwaHelpers/checkStandaloneMode";

import { withAuth } from "../context/AuthContext";
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
  Card,
} from "@mui/material";

import {
  // Add as AddIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import { Workout } from "../context/WorkoutsContext";

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

const RoutineEditor: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const existingRoutineId = router.query.routineId;

  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (isStandaloneOnMobileSafari()) setIsStandalone(true);
  }, []);

  // ROUTINE ----------------------

  const { routinesData, updateRoutine } = useRoutines();

  const [routineTitle, setRoutineTitle] = useState("");
  const [routineWorkouts, setRoutineWorkouts] = useState<Workout[]>([]);

  // WORKOUTS ----------------------
  const { workoutsData, updateWorkout, getWorkoutsByRoutineId } = useWorkouts();

  useEffect(() => {
    if (!existingRoutineId) router.push(RouterPath.Workouts);

    const title = routinesData.filter(
      (routine) => routine.id === existingRoutineId
    )?.[0]?.title;

    if (title) setRoutineTitle(title);

    getWorkoutsByRoutineId(existingRoutineId as string).then((data) => {
      if (!data) return;
      setRoutineWorkouts(data);
    });
  }, [existingRoutineId]);

  const onUpdateClick = async () => {
    if (!existingRoutineId) return;

    await updateRoutine({
      id: existingRoutineId as string,
      title: routineTitle,
    });

    let index: number = 0;
    for (const workout of routineWorkouts) {
      await updateWorkout({
        id: workout.id,
        routineId: existingRoutineId as string,
        indexInRoutine: index.toString(),
      }).then(() => {
        if (index === routineWorkouts.length - 1)
          router.push(RouterPath.Workouts);
        else index++;
      });
    }
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

    const sortedWorkouts = reorder(
      routineWorkouts,
      result.source.index,
      result.destination.index
    );

    setRoutineWorkouts(sortedWorkouts);
  };

  return (
    <>
      {!!existingRoutineId && <DeleteButton />}
      <MainContentWrapper>
        <TextField
          id="routine-title"
          type="text"
          label="Routine Title"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={routineTitle}
          onChange={(e) => setRoutineTitle(e.target.value)}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ width: "100%" }}
              >
                {routineWorkouts.map((workout, index) => (
                  <Draggable
                    key={workout.id}
                    draggableId={workout.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Card
                        key={"workout-" + index}
                        sx={{ height: 100, mb: 2 }}
                        elevation={0}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Typography>{workout.title}</Typography>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Paper square elevation={0} className={classes.saveButtonContainer}>
          <Button
            variant="contained"
            className={classes.saveButton}
            sx={{
              p: 0,
              pb: isStandalone ? 3.5 : undefined,
            }}
            disabled={!routineTitle}
            onClick={onUpdateClick}
          >
            <Typography
              component="span"
              variant="button"
              className={classes.saveButtonLabel}
            >
              {"Update"} Routine
            </Typography>
          </Button>
        </Paper>
      </MainContentWrapper>
    </>
  );
};

export default withAuth(RoutineEditor);

const DeleteButton = () => {
  const [headerToolbarElement, setHeaderToolbarElement] =
    useState<HTMLElement | null>();
  const router = useRouter();

  const { deleteRoutine } = useRoutines();
  const existingRoutineId = router.query.routineId;

  useEffect(() => {
    const headerToolbar = document.getElementById("right-controls");
    setHeaderToolbarElement(headerToolbar);
  }, []);

  const onDeleteClick = () => {
    if (!existingRoutineId) return;
    deleteRoutine(existingRoutineId as string).then(() =>
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
