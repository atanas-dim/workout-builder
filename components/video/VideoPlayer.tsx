import React, { FC, useState, useRef, useEffect, useCallback } from "react";

import YouTube from "react-youtube";

import { Box, Slider, Typography } from "@mui/material";

import { formatTimeForPlayer } from "../../utilities/videoHelpers/timeFormat";

import styles from "./VideoPlayer.module.css";

type Props = {
  videoId: string;
};

const VideoPlayer: FC<Props> = ({ videoId }) => {
  const player = useRef<any>(null);
  const timer = useRef<NodeJS.Timer | undefined>(undefined);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const updateProgress = useCallback(
    (currentTime: number) => {
      const percent = (currentTime / duration) * 100;
      const rounded = percent.toFixed();
      setProgress(+rounded);
    },
    [duration]
  );

  const updateStateFromCurrentTime = useCallback(
    ({ completed = false }: { completed: boolean }) => {
      player.current.internalPlayer.getCurrentTime().then((time: number) => {
        const rounded = time.toFixed();
        setCurrentTime(+rounded || 0);
        updateProgress(+rounded || 0);
      });

      if (completed) {
        setTimeout(() => {
          setCurrentTime(duration);
          updateProgress(duration);
        }, 1000);
      }
    },
    [updateProgress, duration]
  );

  useEffect(() => {
    if (!isPlaying && timer.current !== undefined) {
      return clearInterval(timer.current);
    } else {
      const timerId = setInterval(() => {
        console.log("timer on");
        if (!player.current) return;

        updateStateFromCurrentTime({ completed: false });

        player.current.internalPlayer
          .getVideoLoadedFraction()
          .then((fraction: number) => {
            setBuffer(fraction);
          });
      }, 1000);

      timer.current = timerId;
    }

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [isPlaying, updateProgress, updateStateFromCurrentTime]);

  const updateCurrentVideoTime = (percent: number) => {
    setProgress(percent);

    const selectedTime = (percent * duration) / 100;
    player.current.internalPlayer.seekTo(selectedTime, true);
    player.current.internalPlayer.playVideo();
  };

  const onPlayerClick = () => {
    if (isPlaying) player.current.internalPlayer.pauseVideo();
    else player.current.internalPlayer.playVideo();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          aspectRatio: "16/9",
          borderRadius: 1,
          position: "relative",
          overflow: "hidden",
        }}
        onClick={onPlayerClick}
      >
        <YouTube
          ref={player}
          videoId={videoId}
          title={"exercise.name"}
          loading={"eager"} // defaults -> undefined
          opts={{
            playerVars: {
              controls: 0,
              showinfo: 0,
              rel: 0,
              modestbranding: 1,
              playsinline: 1,
            },
          }}
          className={styles.player}
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
            updateStateFromCurrentTime({ completed: true });
            setIsPlaying(false);
          }}
        />
      </Box>

      {/* Controls */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "relative",
            ml: 1,
            mr: 1,
            height: 30,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 4,
              marginTop: "13px",

              bgcolor: "primary.main",
              opacity: 0.3,
              borderRadius: 1,
              transform: ` scaleX(${buffer || 0})`,
              transformOrigin: "left",
              transition: "transform 0.3s ease",
            }}
          />

          <Slider
            value={progress}
            onChange={(_, value) => setProgress(value as number)}
            onChangeCommitted={(_, value) =>
              updateCurrentVideoTime(value as number)
            }
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              [".MuiSlider-thumb"]: {
                width: 16,
                height: 16,
              },
            }}
          ></Slider>
        </Box>

        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="span"
          variant="body2"
        >
          <Box
            component="span"
            sx={{ width: 34, mr: 1 / 4, textAlign: "right" }}
          >
            {formatTimeForPlayer(currentTime)}
          </Box>
          /
          <Box
            component="span"
            sx={{ width: 34, ml: 1 / 4, textAlign: "left" }}
          >
            {formatTimeForPlayer(duration)}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
