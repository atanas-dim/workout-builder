import { FC, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/router";

import { styled } from "@mui/system";

import { Workout } from "../../context/WorkoutsContext";
import useRoutines from "../../hooks/useRoutines";

import { Box, Typography, Card, Skeleton, ButtonBase } from "@mui/material";

import { getYouTubeVideoThumbUrl } from "../../utilities/videoHelpers/youtubeVideos";
import ActionButton from "../buttons/ActionButton";

import { AddCircleOutlineRounded as AddIcon } from "@mui/icons-material";
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

const CarouselCard = styled(Card)(({ theme }) => ({
  minWidth: "min(calc(100% - 56px), 360px)",
  height: "fit-content",

  padding: 16,

  scrollSnapAlign: "center",
  scrollSnapStop: "always",

  marginRight: 8,

  "&:only-of-type": {
    width: "100%",
  },

  "&:first-of-type": {
    marginLeft: 8,
    [theme.breakpoints.up("sm")]: {
      marginLeft: 0,
    },
  },
}));

type Props = {
  workouts: { [key: string]: Workout };
};

const RoutineCarousel: FC<Props> = ({ workouts }) => {
  const { push } = useRouter();
  const { currentRoutineId } = useRoutines();
  return (
    <CarouselContainer display="flex">
      {Object.keys(workouts)?.map((key, index) => {
        const workout = workouts[key];
        return (
          <CarouselItem key={"carousel-item-" + index} workout={workout} />
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
  workout: Workout;
};

const CarouselItem: FC<ItemProps> = ({ workout }) => {
  const { push } = useRouter();

  //TODO make these slideshow fade in/out
  const thumbUrl = workout.exercises.find(
    (exercise) => !!exercise.videoUrl
  )?.videoUrl;

  const [imgIsLoading, setImgIsLoading] = useState(true);

  const onStartClick = () => {
    push(RouterPath.Start + `/${workout.id}`);
  };

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
