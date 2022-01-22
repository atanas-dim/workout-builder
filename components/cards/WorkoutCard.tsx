import React, { FC, useState, useEffect, useCallback } from "react";
import { cloneDeep } from "lodash";

import { useRouter } from "next/router";
import { RouterPaths } from "../../pages/_app";

import { Workout } from "../../context/WorkoutsContext";
import useExercises from "../../hooks/useExercises";

import { getYouTubeVideoThumbUrl } from "../../utilities/videoHelpers/getYouTubeVideoId";

import {
  Card,
  Box,
  Typography,
  IconButton,
  Collapse,
  Divider,
  CardMedia,
  Grow,
  Fade,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material/";

import ActionButton from "../buttons/ActionButton";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),

    "&:last-of-type": {
      marginBottom: 0,
    },
  },
  smallButton: {
    padding: theme.spacing(0.5, 1.5),
    minHeight: "auto",
    lineHeight: 1,
    height: 32,
    "& > .MuiButton-endIcon": {
      marginLeft: theme.spacing(0.5),
    },
  },
}));

type Props = {
  workout: Workout;
  index: number;
};

const WorkoutCard: FC<Props> = ({ workout, index }) => {
  const router = useRouter();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState<any[]>([]);
  const { getExerciseById, exercisesData } = useExercises();

  const [show, setShow] = useState(false);

  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setShow(true);
    }, index * 30);

    return () => {
      clearTimeout(transitionTimer);
    };
  }, []);

  const getWorkoutExercises = useCallback(async () => {
    if (!workout || !workout.exercises) return;

    const exerciseDataArray: any[] = [];

    for (const exercise of workout.exercises) {
      const clonedExercise: any = cloneDeep(exercise);
      const exerciseData = exercisesData.find(
        (exercise) => exercise.id === clonedExercise.id
      );

      if (!exerciseData) {
        clonedExercise.title = "Exercise not found";
        clonedExercise.youTubeUrl = "";
      } else {
        clonedExercise.title = exerciseData.title;
        clonedExercise.youTubeUrl = exerciseData.youTubeUrl;
      }
      exerciseDataArray.push(clonedExercise);
    }

    setWorkoutExercises(exerciseDataArray);
  }, [workout]);

  useEffect(() => {
    getWorkoutExercises();
  }, [workout]);

  const onEditClick = () => {
    router.push({
      pathname: RouterPaths.WorkoutEditor,
      query: { workoutId: workout.id },
    });
  };

  return (
    <Grow in={show} appear={true} timeout={600}>
      <Card variant="outlined" className={classes.root}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Typography
            component="h2"
            variant="body1"
            noWrap
            sx={{ fontWeight: 500, width: "calc(100% - 20px)" }}
          >
            {workout.title}
          </Typography>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            {expanded && (
              <ActionButton
                size="small"
                label="Edit"
                variant="text"
                onClick={onEditClick}
                className={classes.smallButton}
                color="primary"
                sx={{ ml: 1 }}
              />
            )}
            <IconButton
              onClick={() => setExpanded((prev) => !prev)}
              size="small"
              aria-expanded={expanded}
              aria-label="Show more"
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>
        <Collapse
          in={expanded}
          timeout={workoutExercises.length * 100}
          sx={{ width: "100%" }}
        >
          {workoutExercises.map((exercise, index) => (
            <Box key={"workout-exersise-" + index}>
              <Box
                display="flex"
                sx={{ width: "100%", mt: index === 0 ? 2 : 0 }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "45%", sm: "30%", md: "25%" },
                    height: "100%",
                    minHeight: 50,
                    mr: 2,
                    borderRadius: 1 / 2,
                  }}
                  image={
                    exercise.youTubeUrl
                      ? getYouTubeVideoThumbUrl(exercise.youTubeUrl, "mq")
                      : "/images/exercise-placeholder.jpg"
                  }
                  alt={exercise.title + " thumbnail"}
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  key={exercise.id}
                  sx={{
                    width: {
                      xs: "calc(60% - 32px)",
                      sm: "calc(70% - 32px)",
                      md: "calc(75% - 32px)",
                    },
                  }}
                >
                  <Typography
                    component="h3"
                    variant="body1"
                    noWrap
                    sx={{ width: "100%", fontWeight: 500 }}
                  >
                    {exercise.title}
                  </Typography>
                  <Typography component="span" variant="body2" noWrap>
                    Sets: {exercise.sets}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    noWrap
                    sx={{ width: "100%" }}
                  >
                    Reps: {exercise.reps}
                  </Typography>
                </Box>
              </Box>
              {index !== workoutExercises.length - 1 && (
                <Divider sx={{ mt: 1, mb: 1 }} />
              )}
            </Box>
          ))}
        </Collapse>
      </Card>
    </Grow>
  );
};

export default WorkoutCard;
