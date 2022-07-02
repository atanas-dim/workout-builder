import React, { FC, useState, useEffect } from "react";

import { useRouter } from "next/router";

import { RouterPath } from "../../resources/routes";

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
  Fade,
} from "@mui/material";

import {
  ExpandMoreRounded as ExpandMoreIcon,
  ExpandLessRounded as ExpandLessIcon,
  MoreHorizRounded as MoreIcon,
} from "@mui/icons-material/";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

import ExercisesItem from "./ExercisesItem";
import IconButtonWithDrawer from "../buttons/IconButtonWithDrawer";
import ActionButton from "../buttons/ActionButton";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
  },
}));

type Props = {
  workout: Workout;
  index: number;
  isLast?: boolean;
};

const WorkoutCard: FC<Props> = ({ workout, index, isLast }) => {
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
      <Card elevation={0} className={classes.root} sx={{ mb: isLast ? 2 : 1 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <ButtonBase
            sx={{
              maxWidth: "calc(100% - 70px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              borderRadius: "6px",
            }}
            disableRipple
            onClick={() => setExpanded((prev) => !prev)}
          >
            <Typography
              component="span"
              variant="body1"
              align="left"
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

            <IconButtonWithDrawer
              icon={<MoreIcon fontSize="small" />}
              drawerHeading={workout.title}
            >
              <ActionButton
                label="Edit workout"
                onClick={onEditWorkoutClick}
                fullWidth
                sx={{ maxWidth: 400, margin: "auto" }}
              />
            </IconButtonWithDrawer>
          </Box>
        </Box>

        <Collapse
          in={expanded}
          timeout={workout.exercises.length > 3 ? 600 : 300}
          sx={{ width: "100%" }}
        >
          {workout.exercises.map((exercise, index) => (
            <Box
              key={"workout-exersise-" + index}
              sx={{ mt: index === 0 ? 2 : 0 }}
            >
              <ExercisesItem data={exercise} />

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
