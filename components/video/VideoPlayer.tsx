import React, { FC, useState, useRef, useEffect, useCallback } from "react";

import YouTube from "react-youtube";

import { Box, Slider, Typography, IconButton } from "@mui/material";

import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from "@mui/icons-material/";

import { formatTimeForPlayer } from "../../utilities/videoHelpers/timeFormat";

import styles from "./VideoPlayer.module.css";

type Props = {
  videoId: string;
};

const VideoPlayer: FC<Props> = ({ videoId }) => {
  const player = useRef<any>(null);
  const timer = useRef<NodeJS.Timer | undefined>(undefined);

  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const updateProgress = useCallback(
    (currentTime: number) => {
      const percent = (currentTime / duration) * 100;
      const rounded = percent.toFixed();
      setProgress(+rounded);
    },
    [duration]
  );

  useEffect(() => {
    if (!isPlaying && timer.current !== undefined) {
      return clearInterval(timer.current);
    }

    const timerId = setInterval(() => {
      console.log("timer on");
      if (!player.current) return;
      player.current.internalPlayer.getCurrentTime().then((time: number) => {
        updateProgress(time || 0);
      });
    }, 1000);

    timer.current = timerId;

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [isPlaying, updateProgress]);

  const updateCurrentVideoTime = (percent: number) => {
    setProgress(percent);
    if (timer.current !== undefined) clearInterval(timer.current);

    const selectedTime = (percent * duration) / 100;
    player.current.internalPlayer.seekTo(selectedTime, true);
  };

  const onFullScreenClick = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "background.default",
        ...(isFullscreen && {
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 10,
        }),
      }}
    >
      <Box
        sx={{
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <YouTube
          ref={player}
          videoId={videoId}
          title={"exercise.name"}
          loading={"eager"} // defaults -> undefined
          opts={{
            width: "100%",
            height: "100%",

            playerVars: {
              controls: 0,
              showinfo: 0,
              rel: 0,
              modestbranding: 1,
              playsinline: 1,
            },
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
          iframeClassName={styles.playerIframe}
          onReady={(e) => {
            setDuration(e.target.getDuration());
          }}
          onPlay={(e) => {
            setIsPlaying(true);
          }}
          onPause={(e) => {
            setIsPlaying(false);
          }}
          onEnd={(e) => {
            setIsPlaying(false);
          }}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          ...(isFullscreen && {
            "@media (orientation: landscape)": {
              pl: 6,
              pr: 6,
            },
          }),
        }}
      >
        <Slider
          value={progress}
          onChange={(_, value) => setProgress(value as number)}
          onChangeCommitted={(_, value) =>
            updateCurrentVideoTime(value as number)
          }
          sx={{ ml: 2, mr: 1 }}
        />
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="span"
          variant="body2"
        >
          <Box component="span" sx={{ mr: 1 / 4, textAlign: "right" }}>
            {formatTimeForPlayer(progress)}
          </Box>
          /
          <Box component="span" sx={{ ml: 1 / 4, textAlign: "left" }}>
            {formatTimeForPlayer(duration)}
          </Box>
        </Typography>
        <IconButton onClick={onFullScreenClick}>
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
