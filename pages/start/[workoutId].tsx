import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import useWorkouts from "../../hooks/useWorkouts";

import MainContentWrapper from "../../components/mainContent/MainContentWrapper";

const VideoPlayer = dynamic(() => import("../../components/video/VideoPlayer"));

import { getYouTubeVideoId } from "../../utilities/videoHelpers/youtubeVideos";

import { Box } from "@mui/material";

const Start: NextPage = () => {
  const { query } = useRouter();
  const { workouts } = useWorkouts();

  const currentWorkout = workouts.find(
    (workout) => workout.id === query.workoutId
  );

  return (
    <>
      <MainContentWrapper>
        {currentWorkout?.title}
        <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
          {currentWorkout?.exercises.map((exercise, index) => {
            // if (index > 0) return;
            const videoId = getYouTubeVideoId(exercise.videoUrl);
            return <VideoPlayer key={"video-" + index} videoId={videoId} />;
          })}
        </Box>
      </MainContentWrapper>
    </>
  );
};

export default Start;
