import React, { FC, useState } from "react";
import Image from "next/image";

import { Box, Typography, CardMedia, Skeleton } from "@mui/material";

import { WorkoutExerciseEntry } from "../../context/WorkoutsContext";

import { getYouTubeVideoThumbUrl } from "../../utilities/videoHelpers/getYouTubeVideoId";

type Props = {
  data: WorkoutExerciseEntry;
};

const ExercisesItem: FC<Props> = ({ data }) => {
  const [imgIsLoading, setImgIsLoading] = useState(true);

  return (
    <Box display="flex" sx={{ width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          mr: 2,
          width: { xs: "45%", sm: "30%", md: "25%" },
          aspectRatio: "16/9",
          borderRadius: 1 / 2,
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
            }}
          />
        )}

        <Image
          src={
            data.videoUrl
              ? getYouTubeVideoThumbUrl(data.videoUrl, "mq")
              : "/images/exercise-placeholder.jpg"
          }
          alt={data.name + " thumbnail"}
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setImgIsLoading(false)}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        key={data.id}
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
          {data.name}
        </Typography>
        <Typography component="span" variant="body2" noWrap>
          Sets: {data.sets}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          noWrap
          sx={{ width: "100%" }}
        >
          Reps: {data.reps}
        </Typography>
      </Box>
    </Box>
  );
};

export default ExercisesItem;
