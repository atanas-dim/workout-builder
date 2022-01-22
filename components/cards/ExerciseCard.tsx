import React, { FC, useRef, useEffect, useState } from "react";
import Truncate from "react-truncate";

import { Exercise } from "../../context/ExercisesContext";

import { getYouTubeVideoThumbUrl } from "../../utilities/videoHelpers/getYouTubeVideoId";

import { Card, CardMedia, Box, Typography, Grow, Fade } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material/";
import ActionButton from "../buttons/ActionButton";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: 110,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    "&:last-of-type": {
      marginBottom: 0,
    },
  },
  exerciseDetails: {
    flex: 1,
    height: "100%",
    padding: theme.spacing(1, 0, 0, 2),
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
  index: number;
  exercise: Exercise;
  handleAddClick?: (exerciseId: string) => void;
  onEditClick?: (exerciseId: string) => void;
};

export const ExerciseCard: FC<Props> = ({
  index,
  exercise,
  handleAddClick,
  onEditClick,
}) => {
  const classes = useStyles();
  const { id, title, youTubeUrl } = exercise;
  const textRef = useRef<HTMLDivElement>(null);
  const [textContainerWidth, setTextContainerWidth] = useState(60);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setShow(true);
    }, index * 60);

    return () => {
      clearTimeout(transitionTimer);
    };
  }, []);

  useEffect(() => {
    if (textRef?.current?.clientWidth)
      setTextContainerWidth(textRef.current.clientWidth);
  }, [textRef.current]);

  return (
    <Grow in={show} appear={true} timeout={600}>
      <Card className={classes.root} variant="outlined">
        {
          <CardMedia
            component="img"
            sx={{
              width: { xs: "45%", sm: "35%" },
              maxWidth: { xs: 160, sm: 175 },
              minHeight: 88,
              height: "100%",
              borderRadius: 1 / 2,
            }}
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
          ref={textRef}
        >
          <Typography component="h2" variant="body1" sx={{ fontWeight: 500 }}>
            <Truncate lines={2} trimWhitespace width={textContainerWidth - 40}>
              {title}
            </Truncate>
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
                color="primary"
              />
            )}
            {onEditClick && (
              <ActionButton
                size="small"
                label="Edit"
                variant="text"
                onClick={() => onEditClick(id)}
                className={classes.smallButton}
                color="primary"
              />
            )}
          </Box>
        </Box>
      </Card>
    </Grow>
  );
};

export default ExerciseCard;
