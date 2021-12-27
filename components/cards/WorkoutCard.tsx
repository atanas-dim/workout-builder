import React, { FC, useState, useEffect, useCallback } from "react";
import { cloneDeep } from "lodash";

import { Workout } from "../../hooks/useWorkouts";
import useExercises from "../../hooks/useExercises";

import { getYouTubeVideoThumbUrl } from "../../utilities/videoHelpers/getYouTubeVideoId";

import {
  Card,
  Box,
  Typography,
  IconButton,
  Collapse,
  Divider,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material/";

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
}));

type Props = {
  workout: Workout;
  // deleteExercise?: (exerciseId: string) => void;
};

const WorkoutCard: FC<Props> = ({ workout }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [exercisesData, setExercisesData] = useState<any[]>([]);
  const { getExerciseById } = useExercises();

  const getExercisesData = useCallback(async () => {
    if (!workout || !workout.exercises) return;

    const exerciseDataArray: any[] = [];

    for (const exercise of workout.exercises) {
      const clonedExercise: any = cloneDeep(exercise);
      const exerciseData = await getExerciseById(exercise.id);
      if (!exerciseData) {
        clonedExercise.title = "Exercise not found";
        clonedExercise.youTubeUrl = "";
      } else {
        clonedExercise.title = exerciseData.title;
        clonedExercise.youTubeUrl = exerciseData.youTubeUrl;
      }
      exerciseDataArray.push(clonedExercise);
    }

    setExercisesData(exerciseDataArray);
  }, [workout, getExerciseById]);

  useEffect(() => {
    getExercisesData();
  }, []);

  return (
    <Card variant="outlined" className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography component="h2" variant="body1" sx={{ fontWeight: 500 }}>
          {workout.title}
        </Typography>
        <IconButton
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{ width: "100%" }}
      >
        <Box sx={{ width: "100%" }}>
          {exercisesData.length &&
            exercisesData.map((exercise, index) => (
              <Box sx={{ mt: 2 }} key={"exercise-details-" + index}>
                <img
                  src={
                    exercise.youTubeUrl
                      ? getYouTubeVideoThumbUrl(exercise.youTubeUrl, "hq")
                      : "/images/exercise-placeholder.jpg"
                  }
                  alt={exercise.title + " thumbnail"}
                  style={{ width: "100%" }}
                />
                <Box key={exercise.id} sx={{ width: "100%" }}>
                  <Typography component="h3" variant="body1">
                    {exercise.title}
                  </Typography>
                  <Typography component="span" variant="body2" sx={{ mr: 2 }}>
                    Sets: {exercise.sets}
                  </Typography>
                  <Typography component="span" variant="body2">
                    Reps: {exercise.reps}
                  </Typography>
                </Box>
                {index !== exercisesData.length - 1 && (
                  <Divider sx={{ mt: 2 }} />
                )}
              </Box>
            ))}
        </Box>
      </Collapse>
    </Card>
  );
};

export default WorkoutCard;
