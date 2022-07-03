import { NextPage } from "next";
import React, { useState, useEffect, useCallback } from "react";

import { useRouter } from "next/router";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { RouterPath } from "../resources/routes";
import { isStandaloneOnMobileSafari } from "../utilities/pwaHelpers/checkStandaloneMode";

import { withPrivate } from "../context/AuthContext";

import useWorkouts from "../hooks/useWorkouts";
import useRoutines from "../hooks/useRoutines";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import {
  TextField,
  Paper,
  Typography,
  Button,
  IconButton,
  Card,
  Portal,
} from "@mui/material";

import {
  AddRounded as AddIcon,
  DeleteOutlineRounded as DeleteIcon,
  CancelRounded as RemoveIcon,
  DragIndicatorRounded as DragIcon,
} from "@mui/icons-material";

import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import ActionButton from "../components/buttons/ActionButton";
import IconButtonWithConfirm from "../components/buttons/IconButtonWithConfirm";
import AddWorkoutModal from "../components/modals/AddWorkoutModal";

import { Workout, WorkoutOrderItem } from "../context/WorkoutsContext";
import { generateRandomId } from "../utilities/general/helpers";

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

const RoutineEditor: NextPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const existingRoutineId = router.query.routineId;
  const isExistingRoutine = !!existingRoutineId;

  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (isStandaloneOnMobileSafari()) setIsStandalone(true);
  }, []);

  // ROUTINE ----------------------

  const { routines, createRoutine, updateRoutine } = useRoutines();

  const [routineTitle, setRoutineTitle] = useState("");
  const [draggableItems, setDraggableItems] = useState<
    { title: string; id: string; orderId: string }[]
  >([]);

  const [routineOrderArray, setRoutineOrderArray] = useState<
    WorkoutOrderItem[]
  >([]);

  // WORKOUTS ----------------------
  const { workouts } = useWorkouts();

  useEffect(() => {
    if (!existingRoutineId) return;

    const title = routines.filter(
      (routine) => routine.id === existingRoutineId
    )?.[0]?.title;

    if (title) setRoutineTitle(title);

    const workoutsOrderArray =
      routines.find((routine) => routine.id === existingRoutineId)?.workouts ||
      [];
    setRoutineOrderArray([...workoutsOrderArray]);
  }, [existingRoutineId, routines]);

  const getDraggableItems = useCallback(
    (routineOrderArray: WorkoutOrderItem[]) => {
      const draggableItems: any[] = [];

      routineOrderArray.forEach((entry) => {
        const foundWorkout = workouts.find(
          (workout) => workout.id === entry.id
        );
        if (!foundWorkout) return;

        const draggableItemData = {
          title: foundWorkout.title,
          id: foundWorkout.id,
          orderId: entry.orderId,
        };

        draggableItems.push(draggableItemData);
      });

      return draggableItems;
    },
    [workouts]
  );

  useEffect(() => {
    const itemsArray = getDraggableItems(routineOrderArray);
    setDraggableItems(itemsArray);
  }, [routineOrderArray, getDraggableItems]);

  const removeWorkout = (orderId: string) => {
    setRoutineOrderArray((prev) =>
      prev.filter((item) => item.orderId !== orderId)
    );
  };

  // -------------------
  const onSaveClick = async () => {
    await createRoutine({
      title: routineTitle,
      workouts: routineOrderArray,
    }).then(() => router.push(RouterPath.Workouts));
  };

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

  const openAddWorkoutModal = () => {
    setShowWorkoutsModal(true);
  };

  const onAddWorkoutToRoutineClick = (workoutId: string) => {
    if (!workoutId) return;
    setRoutineOrderArray((prev) => [
      ...prev,
      { id: workoutId, orderId: generateRandomId() },
    ]);
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
                {!!draggableItems.length &&
                  draggableItems?.map((item, index) => {
                    const fallbackId = generateRandomId();
                    return (
                      <Draggable
                        key={item?.orderId || fallbackId}
                        draggableId={item?.orderId || fallbackId}
                        index={index}
                        isDragDisabled={!item?.id}
                      >
                        {(provided, snapshot) => (
                          <Card
                            key={"workout-" + index}
                            sx={{
                              height: 80,
                              mb: 1,
                              p: 1,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                            elevation={0}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            {...provided.dragHandleProps}
                          >
                            <IconButton disabled={!item?.id}>
                              <DragIcon />
                            </IconButton>
                            <Typography
                              noWrap
                              sx={{ fontWeight: 500, flex: 1 }}
                              color={!!item?.title ? "default" : "error"}
                            >
                              {item?.title || "Workout not available"}
                            </Typography>

                            <IconButton
                              onClick={() => removeWorkout(item.orderId)}
                            >
                              <RemoveIcon />
                            </IconButton>
                          </Card>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <ActionButton
          label="Add workout"
          onClick={openAddWorkoutModal}
          sx={{ mb: 2, maxWidth: 400, margin: "auto" }}
          fullWidth
          endIcon={<AddIcon />}
        />

        <AddWorkoutModal
          show={showWorkoutsModal}
          hide={() => setShowWorkoutsModal(false)}
          onAddClick={onAddWorkoutToRoutineClick}
        />

        <Paper square elevation={0} className={classes.saveButtonContainer}>
          <Button
            variant="contained"
            className={classes.saveButton}
            sx={{
              p: 0,
              pb: isStandalone ? 3.5 : undefined,
            }}
            disabled={!routineTitle}
            onClick={isExistingRoutine ? onUpdateClick : onSaveClick}
          >
            <Typography
              component="span"
              variant="button"
              className={classes.saveButtonLabel}
            >
              {isExistingRoutine ? "Update" : "Create"} Routine
            </Typography>
          </Button>
        </Paper>
      </MainContentWrapper>
    </>
  );
};

export default withPrivate(RoutineEditor);

const DeleteButton = () => {
  const router = useRouter();

  const { deleteRoutine } = useRoutines();
  const existingRoutineId = router.query.routineId;

  const onDeleteClick = () => {
    if (!existingRoutineId) return;
    deleteRoutine(existingRoutineId as string).then(() =>
      router.push(RouterPath.Workouts)
    );
  };

  return (
    <Portal container={document.getElementById("right-controls")}>
      <IconButtonWithConfirm
        icon={<DeleteIcon />}
        confirmLabel="Delete"
        onConfirmClick={onDeleteClick}
        heading="Delete routine?"
        message="This action will permanently delete the selected routine entry."
      />
    </Portal>
  );
};
