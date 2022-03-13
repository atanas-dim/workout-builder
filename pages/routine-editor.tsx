import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { RouterPath } from "../resources/routes";
import { isStandaloneOnMobileSafari } from "../utilities/pwaHelpers/checkStandaloneMode";

import { withAuth } from "../context/AuthContext";

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
  Modal,
} from "@mui/material";

import {
  Add as AddIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import ActionButton from "../components/buttons/ActionButton";

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

  const [routineOrderArray, setRoutineOrderArray] = useState<string[]>([]);

  // WORKOUTS ----------------------
  const { workoutsData } = useWorkouts();

  useEffect(() => {
    if (!existingRoutineId) router.push(RouterPath.Workouts);

    const title = routinesData.filter(
      (routine) => routine.id === existingRoutineId
    )?.[0]?.title;

    if (title) setRoutineTitle(title);

    const workoutsOrderArray =
      routinesData.find((routine) => routine.id === existingRoutineId)
        ?.workouts || [];
    setRoutineOrderArray([...workoutsOrderArray]);
  }, [existingRoutineId]);

  useEffect(() => {
    const foundWorkouts = getRoutineWorkouts(routineOrderArray);

    setRoutineWorkouts(foundWorkouts);
  }, [routineOrderArray]);

  const getRoutineWorkouts = (routineOrderArray: string[]) => {
    const foundWorkouts: any[] = [];

    routineOrderArray.forEach((entryId) => {
      const foundWorkout = workoutsData.find(
        (workout) => workout.id === entryId
      );

      foundWorkouts.push(foundWorkout);
    });
    return foundWorkouts;
  };

  // -------------------

  const onUpdateClick = async () => {
    if (!existingRoutineId) return;

    await updateRoutine({
      id: existingRoutineId as string,
      title: routineTitle,
      workouts: routineOrderArray,
    }).then(() => {
      router.push(RouterPath.Workouts);
    });
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

    const sortedWorkoutsArray = reorder(
      routineOrderArray,
      result.source.index,
      result.destination.index
    );

    setRoutineOrderArray(sortedWorkoutsArray);
  };

  // -------------
  const [showWorkoutsModal, setShowWorkoutsModal] = useState(false);
  const onAddWorkoutClick = () => {
    setShowWorkoutsModal(true);
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
                    key={workout.id + index}
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
                        <Button
                          onClick={() => {
                            setRoutineOrderArray((prev) =>
                              prev.filter(
                                (item, itemIndex) => itemIndex !== index
                              )
                            );
                          }}
                        >
                          remove
                        </Button>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <ActionButton
          label="Add workout"
          onClick={onAddWorkoutClick}
          sx={{ mb: 2 }}
          fullWidth
          endIcon={<AddIcon />}
        />
        {
          <Modal
            open={showWorkoutsModal}
            onClose={() => setShowWorkoutsModal(false)}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Card sx={{ m: 2, p: 2, width: "100%" }}>
              workouts
              <Box>
                {workoutsData.map((workout) => {
                  return (
                    <Button
                      key={"workout-button-" + workout.id}
                      sx={{ border: "solid 1px lightgrey" }}
                      onClick={() =>
                        setRoutineOrderArray((prev) => [...prev, workout.id])
                      }
                    >
                      {workout.title}
                    </Button>
                  );
                })}
              </Box>
            </Card>
          </Modal>
        }

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
