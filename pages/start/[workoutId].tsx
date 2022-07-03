import React, { useEffect } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import useWorkouts from "../../hooks/useWorkouts";

import { RouterPath } from "../../resources/routes";

import MainContentWrapper from "../../components/mainContent/MainContentWrapper";

const VideoPlayer = dynamic(() => import("../../components/video/VideoPlayer"));

import { getYouTubeVideoId } from "../../utilities/videoHelpers/youtubeVideos";

import { Box } from "@mui/material";

const Start: NextPage = () => {
  const { query, push } = useRouter();
  const { workouts } = useWorkouts();

  const currentWorkout = workouts.find(
    (workout) => workout.id === query.workoutId
  );

  // Test
  useEffect(() => {
    if (!query?.orderId) return;
    let timer1 = setTimeout(() => {
      localStorage.setItem("lastCompletedOrderId", query.orderId as string);

      push(RouterPath.Training);
    }, 3000);

    return () => {
      clearTimeout(timer1);
    };
  }, [query, push]);

  return (
    <>
      <MainContentWrapper>
        {currentWorkout?.title}
        <Box
          display="flex"
          flexDirection="column"
          sx={{ width: "100%", height: "100%" }}
        >
          {currentWorkout?.exercises?.map((exercise, index) => {
            if (index > 0) return;
            const videoId = getYouTubeVideoId(exercise.videoUrl);
            return <VideoPlayer key={"video-" + index} videoId={videoId} />;
          })}
        </Box>
      </MainContentWrapper>
    </>
  );
};

export default Start;
