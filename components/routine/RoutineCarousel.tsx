import { FC } from "react";

import { styled } from "@mui/system";

import useRoutines from "../../hooks/useRoutines";
import useWorkouts from "../../hooks/useWorkouts";

import { Box, Typography, CardMedia, Card } from "@mui/material";

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

  "&:first-of-type": {
    marginLeft: 16,
  },
}));

const RoutineCarousel: FC = () => {
  const { currentRoutineId } = useRoutines();
  const { sortedWorkouts } = useWorkouts();

  const currentRoutineWorkouts = currentRoutineId
    ? sortedWorkouts?.[currentRoutineId].workouts
    : [];

  return (
    <CarouselContainer display="flex">
      {currentRoutineWorkouts?.map((workout) => {
        const thumbUrl = workout.exercises.find(
          (exercise) => !!exercise.videoUrl
        )?.videoUrl;

        return (
          <CarouselCard key={workout.id} elevation={0}>
            <Typography
              component="span"
              variant="h6"
              noWrap
              sx={{ mb: 2, display: "block" }}
            >
              {workout.title}
            </Typography>

            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "100%",

                mb: 2,
                borderRadius: 1 / 2,
              }}
              image={
                thumbUrl
                  ? getYouTubeVideoThumbUrl(thumbUrl, "mq")
                  : "/images/exercise-placeholder.jpg"
              }
              alt={workout.title + " cover image"}
            />
            <ActionButton
              label="Start"
              fullWidth
              onClick={() => {}}
              href="/#"
            />
          </CarouselCard>
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
