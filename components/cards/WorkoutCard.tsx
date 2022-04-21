import React, { FC, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { RouterPath } from "../../resources/routes";

import { getYouTubeVideoThumbUrl } from "../../utilities/videoHelpers/getYouTubeVideoId";
import { generateRandomId } from "../../utilities/general/helpers";

import { Workout } from "../../context/WorkoutsContext";

import {
  Card,
  Box,
  Typography,
  IconButton,
  ButtonBase,
  Collapse,
  Divider,
  CardMedia,
  Fade,
} from "@mui/material";
import {
  ExpandMoreRounded as ExpandMoreIcon,
  ExpandLessRounded as ExpandLessIcon,
  MoreHorizRounded as MoreIcon,
} from "@mui/icons-material/";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

import IconButtonWithMenu from "../buttons/IconButtonWithMenu";

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
  }, [index]);

  const onEditWorkoutClick = () => {
    router.push({
      pathname: RouterPath.WorkoutEditor,
      query: { workoutId: workout.id },
    });
  };

  return (
    <Fade in={show} appear={show} timeout={600}>
      <Card elevation={0} className={classes.root}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <ButtonBase
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              borderRadius: "6px",
            }}
            disableRipple
            onClick={() => setExpanded((prev) => !prev)}
          >
            <Typography
              component="span"
              variant="body1"
              noWrap
              sx={{
                fontWeight: 500,
                lineHeight: "36px",
              }}
            >
              {workout.title}
            </Typography>
          </ButtonBase>

          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <IconButton
              onClick={() => setExpanded((prev) => !prev)}
              size="small"
              aria-expanded={expanded}
              aria-label="Show more"
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>

            <IconButtonWithMenu
              id={generateRandomId()}
              icon={<MoreIcon fontSize="small" />}
              menuTitle="Workout"
              menuItems={[
                {
                  label: "Edit",
                  onClick: onEditWorkoutClick,
                },
              ]}
            />
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
                    component="span"
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
    </Fade>
  );
};

export default WorkoutCard;
