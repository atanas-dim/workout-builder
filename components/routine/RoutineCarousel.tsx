import { FC, useState } from "react";
import { styled } from "@mui/system";

import useRoutines from "../../hooks/useRoutines";
import useWorkouts from "../../hooks/useWorkouts";
import { Workout } from "../../context/WorkoutsContext";

import { Box, Typography, CardMedia, Card, Skeleton } from "@mui/material";

import { getYouTubeVideoThumbUrl } from "../../utilities/videoHelpers/getYouTubeVideoId";
import ActionButton from "../buttons/ActionButton";

const CarouselContainer = styled(Box)(({ theme }) => ({
  minWidth: "calc(100% + 32px)",
  width: "calc(100% + 32px)",
  maxWidth: "100%",
  overflowY: "auto",
  marginBottom: 16,

  [theme.breakpoints.up("sm")]: {
    minWidth: "calc(100% + 48px)",
    width: "calc(100% + 48px)",
  },

  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none" /* IE and Edge */,
  scrollbarWidth: "none" /* Firefox */,

  scrollSnapType: "x mandatory",
}));

const CarouselCard = styled(Card)(({ theme }) => ({
  minWidth: "min(calc(100% - 56px), 360px)",
  height: "fit-content",

  padding: 16,

  scrollSnapAlign: "center",
  scrollSnapStop: "always",

  marginRight: 16,

  "&:only-child": {
    width: "calc(100% + 48px)",
  },

  "&:first-of-type": {
    marginLeft: 16,
  },
}));

type Props = {
  workouts: { [key: string]: Workout };
};

const RoutineCarousel: FC<Props> = ({ workouts }) => {
  return (
    <CarouselContainer display="flex">
      {Object.keys(workouts)?.map((key, index) => {
        const workout = workouts[key];
        return (
          <CarouselItem key={"carousel-item-" + index} workout={workout} />
        );
      })}
      <div
        role="presentation"
        style={{
          minWidth: 1,
          width: 1,
        }}
      />
    </CarouselContainer>
  );
};

export default RoutineCarousel;

type ItemProps = {
  workout: Workout;
};

const CarouselItem: FC<ItemProps> = ({ workout }) => {
  const thumbUrl = workout.exercises.find(
    (exercise) => !!exercise.videoUrl
  )?.videoUrl;

  const [imgIsLoading, setImgIsLoading] = useState(true);

  return (
    <CarouselCard key={workout.id} elevation={0}>
      <Typography
        component="span"
        variant="h6"
        noWrap
        sx={{ mb: 2, display: "block", textTransform: "uppercase" }}
      >
        {workout.title}
      </Typography>

      <Box sx={{ position: "relative", pt: "55%", mb: 2 }}>
        {imgIsLoading && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: "100%",
              borderRadius: "6px",
            }}
          />
        )}

        <CardMedia
          component="img"
          onLoad={() => setImgIsLoading(false)}
          sx={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            borderRadius: 1 / 2,
          }}
          image={
            thumbUrl
              ? getYouTubeVideoThumbUrl(thumbUrl, "mq")
              : "/images/exercise-placeholder.jpg"
          }
          alt={workout.title + " cover image"}
        />
      </Box>

      <ActionButton label="Start" fullWidth onClick={() => {}} href="/#" />
    </CarouselCard>
  );
};
