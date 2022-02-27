import React, { FC, useState, useEffect } from "react";

import { useRouter } from "next/router";
import { RouterPath } from "../../resources/routes";

import { Workout } from "../../context/WorkoutsContext";

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

  const [show, setShow] = useState(false);

  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setShow(true);
    }, index * 30);

    return () => {
      clearTimeout(transitionTimer);
    };
  }, []);

  const onEditClick = () => {
    router.push({
      pathname: RouterPath.WorkoutEditor,
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
          timeout={workout.exercises.length * 100}
          sx={{ width: "100%" }}
        >
          {workout.exercises.map((exercise, index) => (
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
                    exercise.videoUrl
                      ? getYouTubeVideoThumbUrl(exercise.videoUrl, "mq")
                      : "/images/exercise-placeholder.jpg"
                  }
                  alt={exercise.name + " thumbnail"}
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
                    {exercise.name}
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
              {index !== workout.exercises.length - 1 && (
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
