import React, { FC, useEffect, useState } from "react";
import { IconButton, Card, CardMedia, Box, Typography } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material/";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: 120,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    "&:last-of-type": {
      marginBottom: 0,
    },
  },
  exerciseDetails: {
    flex: 1,
    height: "100%",
    padding: theme.spacing(3, 2),
  },
}));

type Props = {
  exercise: { [key: string]: any };
  deleteExercise?: any;
};

export const ExerciseCard: FC<Props> = ({ exercise, deleteExercise }) => {
  const classes = useStyles();
  const { id, title, youTubeUrl } = exercise;
  const [youTubeVideoId, setYouTubeVideoId] = useState("");

  useEffect(() => {
    if (youTubeUrl) getYouTubeVideoId(youTubeUrl);
  }, [youTubeUrl]);

  const getYouTubeVideoId = (videoUrl: string) => {
    // https://youtu.be/rT7DgCr-3pg
    // https://www.youtube.com/watch?v=rT7DgCr-3pg
    const urlTypeOne = "youtu.be/";
    const urlTypeTwo = "youtube.com/watch?v=";
    let videoId = "";

    if (videoUrl.includes(urlTypeOne)) {
      const splitUrl = videoUrl.split(urlTypeOne);
      videoId = splitUrl[splitUrl.length - 1];
    }

    if (videoUrl.includes(urlTypeTwo)) {
      const splitUrl = videoUrl.split(urlTypeTwo);
      videoId = splitUrl[splitUrl.length - 1];
    }

    setYouTubeVideoId(videoId);
  };

  return (
    <Card className={classes.root} variant="outlined">
      {
        <CardMedia
          component="img"
          sx={{ width: { xs: "40%", sm: "30%", md: "25%" }, height: "100%" }}
          image={
            youTubeVideoId
              ? `https://img.youtube.com/vi/${youTubeVideoId}/mqdefault.jpg`
              : "/images/exercise-placeholder.jpg"
          }
          alt={`${title} video thumbnail`}
        />
      }
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className={classes.exerciseDetails}
      >
        <Typography>{title}</Typography>

        <IconButton color="inherit" onClick={() => deleteExercise(id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ExerciseCard;
