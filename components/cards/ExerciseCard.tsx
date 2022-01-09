import React, { FC, useEffect, useState } from "react";

import { Exercise } from "../../hooks/useExercises";

import { getYouTubeVideoThumbUrl } from "../../utilities/videoHelpers/getYouTubeVideoId";

import { Card, CardMedia, Box, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material/";
import ActionButton from "../buttons/ActionButton";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: 120,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
    marginBottom: theme.spacing(2),
    "&:last-of-type": {
      marginBottom: 0,
    },
  },
  exerciseDetails: {
    flex: 1,
    height: "100%",
    padding: theme.spacing(2),
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
  exercise: Exercise;
  handleAddClick?: (exerciseId: string) => void;
  onEditClick?: (exerciseId: string) => void;
};

export const ExerciseCard: FC<Props> = ({
  exercise,
  handleAddClick,
  onEditClick,
}) => {
  const classes = useStyles();
  const { id, title, youTubeUrl } = exercise;

  return (
    <Card className={classes.root} variant="outlined">
      {
        <CardMedia
          component="img"
          sx={{ width: { xs: "40%", sm: "30%", md: "25%" }, height: "100%" }}
          image={
            youTubeUrl
              ? getYouTubeVideoThumbUrl(youTubeUrl, "mq")
              : "/images/exercise-placeholder.jpg"
          }
          alt={`${title} video thumbnail`}
        />
      }
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
        className={classes.exerciseDetails}
      >
        <Typography component="h2" variant="body1" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>

        <Box display="flex" justifyContent="flex-end" sx={{ width: "100%" }}>
          {handleAddClick && (
            <ActionButton
              label="Add"
              size="small"
              variant="text"
              onClick={() => handleAddClick(id)}
              endIcon={<AddIcon />}
              className={classes.smallButton}
              color="inherit"
            />
          )}
          {onEditClick && (
            <ActionButton
              size="small"
              label="Edit"
              variant="text"
              onClick={() => onEditClick(id)}
              className={classes.smallButton}
              color="inherit"
            />
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default ExerciseCard;
