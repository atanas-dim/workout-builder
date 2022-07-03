import { FC, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { styled } from "@mui/system";

import { Workout, WorkoutExtended } from "../../context/WorkoutsContext";

import useRoutines from "../../hooks/useRoutines";

import { Box, Typography, Card, Skeleton, ButtonBase } from "@mui/material";
import { AddCircleOutlineRounded as AddIcon } from "@mui/icons-material";

import { getYouTubeVideoThumbUrl } from "../../utilities/videoHelpers/youtubeVideos";
import ActionButton from "../buttons/ActionButton";

import { RouterPath } from "../../resources/routes";

const CarouselContainer = styled(Box)(({ theme }) => ({
  minWidth: "calc(100% + 16px)",
  width: "calc(100% + 16px)",
  maxWidth: "100%",
  overflowY: "auto",
  marginBottom: 16,

  [theme.breakpoints.up("sm")]: {
    minWidth: "100%",
  },

  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none" /* IE and Edge */,
  scrollbarWidth: "none" /* Firefox */,

  scrollSnapType: "x mandatory",
}));

const CarouselCard = styled(Card)(({ theme }) => {
  return {
    minWidth: "min(calc(100% - 56px), 360px)",
    height: "fit-content",

    padding: 16,
    marginRight: 8,

    position: "relative",

    scrollSnapAlign: "center",
    scrollSnapStop: "always",

    "&:only-of-type": {
      width: "100%",
    },

    "&:first-of-type": {
      marginLeft: 8,
      [theme.breakpoints.up("sm")]: {
        marginLeft: 0,
      },
    },
  };
});

type Props = {
  workouts: { [key: string]: WorkoutExtended };
};

const RoutineCarousel: FC<Props> = ({ workouts }) => {
  const { push } = useRouter();
  const { currentRoutineId } = useRoutines();

  // TODO Temporary here. Should be in context
  const lastCompletedOrderId = useMemo(
    () => localStorage?.getItem("lastCompletedOrderId"),
    []
  );

  const lastWorkoutIndex = useMemo(
    () =>
      Object.keys(workouts).findIndex(
        (key) => workouts[key].orderId === lastCompletedOrderId
      ),
    [lastCompletedOrderId, workouts]
  );

  const nextWorkoutIndex = useMemo(
    () =>
      lastWorkoutIndex === Object.keys(workouts).length - 1
        ? 0
        : lastWorkoutIndex + 1,
    [lastWorkoutIndex, workouts]
  );

  useEffect(() => {
    document
      .getElementById("carousel-item-" + nextWorkoutIndex)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "center",
      });
  }, [nextWorkoutIndex]);

  return (
    <CarouselContainer display="flex">
      {Object.keys(workouts)?.map((key, index) => {
        const workout = workouts[key];
        return (
          <CarouselItem
            key={"carousel-item-" + index}
            id={"carousel-item-" + index}
            workout={workout}
            isHighlighted={index === nextWorkoutIndex}
          />
        );
      })}
      <ButtonBase
        sx={{
          mr: { xs: 1, sm: 0 },
          scrollSnapAlign: "center",
          scrollSnapStop: "always",
          borderRadius: 1,
        }}
        onClick={() =>
          push({
            pathname: RouterPath.RoutineEditor,
            query: { routineId: currentRoutineId },
          })
        }
      >
        <Card
          elevation={0}
          sx={{
            minWidth: 120,
            alignSelf: "stretch",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddIcon fontSize="large" fill="gray.400" />
        </Card>
      </ButtonBase>

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
  id: string;
  workout: WorkoutExtended;
  isHighlighted: boolean;
};

const CarouselItem: FC<ItemProps> = ({ id, workout, isHighlighted }) => {
  const { push } = useRouter();

  const thumbUrl = workout.exercises.find(
    (exercise) => !!exercise.videoUrl
  )?.videoUrl;

  const [imgIsLoading, setImgIsLoading] = useState(true);

  const onStartClick = () => {
    push(RouterPath.Start + `/${workout.id}?orderId=${workout.orderId}`);
  };

  return (
    <CarouselCard id={id} elevation={0}>
      {isHighlighted && (
        <Typography
          component="span"
          sx={{
            position: "absolute",
            top: 0,
            left: 16,
            p: "3px 6px",
            lineHeight: 1,
            borderRadius: 1,
            bgcolor: "primary.main",
            color: "#000",
            fontSize: "0.75rem",
          }}
        >
          Next
        </Typography>
      )}
      <Typography
        component="span"
        variant="h6"
        noWrap
        sx={{ mb: 2, display: "block" }}
      >
        {workout.title}
      </Typography>

      <Box
        sx={{
          position: "relative",
          mb: 2,
          aspectRatio: "16/9",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
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

        <Image
          src={
            thumbUrl
              ? getYouTubeVideoThumbUrl(thumbUrl, "mq")
              : "./images/exercise-placeholder.jpg"
          }
          alt={workout.title + " cover image"}
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setImgIsLoading(false)}
        />
      </Box>

      <ActionButton label="Start" fullWidth onClick={onStartClick} />
    </CarouselCard>
  );
};
