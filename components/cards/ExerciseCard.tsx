import React, { FC } from "react";
import { Button, Card, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(3, 2),
    marginBottom: theme.spacing(2),
    "&:last-of-type": {
      marginBottom: 0,
    },
  },
}));

type Props = {
  exercise: { [key: string]: any };
  deleteExercise?: any;
};

export const ExerciseCard: FC<Props> = ({ exercise, deleteExercise }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <Typography>{exercise.title}</Typography>
      <Button color="inherit" onClick={() => deleteExercise(exercise.id)}>
        Delete
      </Button>
    </Card>
  );
};

export default ExerciseCard;
