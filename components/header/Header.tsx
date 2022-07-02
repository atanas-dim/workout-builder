import React from "react";

import { useRouter } from "next/router";
import { RouterPath, ROUTE_SETTINGS } from "../../resources/routes";

import { usePWA } from "../../hooks/usePWA";
import useAuth from "../../hooks/useAuth";

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";
import { useScrollTrigger } from "@mui/material/";

import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material/";
import {
  DownloadForOfflineRounded as DownloadIcon,
  ArrowBackIosNewRounded as BackIcon,
  LogoutRounded as SignOutIcon,
} from "@mui/icons-material";

import IOSInstallInstructionsModal from "../modals/IOSInstallInstructionsModal";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.shadows[3],
    borderRadius: 999,
    top: 8,
    left: 8,
    right: 8,
    margin: "auto",
    padding: "0 !important",
    width: "calc(100% - 16px)",
    maxWidth: theme.breakpoints.values.md,
    transition: theme.transitions.create(["height"], {
      duration: theme.transitions.duration.short,
    }),
  },
  headerBg: {
    background: `linear-gradient(${theme.palette.background.default} 30%, transparent)`,
    position: "fixed",
    top: 0,
    width: "100%",
    height: 48,
    zIndex: theme.zIndex.appBar,
  },
  toolbar: {
    minHeight: "initial !important",
    height: "100%",
    width: "100%",
    maxWidth: theme.breakpoints.values.md,
    padding: theme.spacing(0, 2),
    justifyContent: "space-between",
    position: "relative",
    transition: theme.transitions.create(["height"], {
      duration: theme.transitions.duration.short,
    }),
  },
  installButton: {
    animation: `$pulse 12s ${theme.transitions.easing.easeInOut} infinite `,
  },
  "@keyframes pulse": {
    "75%": {
      boxShadow: `0 0 0 -2px ${alpha(
        theme.palette.primary.main,
        0.4
      )}, 0 0 0 -2px ${alpha(theme.palette.primary.main, 0.4)}`,
    },
    "100%": {
      boxShadow: `0 0 0 10px transparent, 0 0 0 16px transparent`,
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const { push, pathname, back } = useRouter();

  const { signOut } = useAuth();

  const {
    showInstallButton,
    showIOSInstallModal,
    hideIOSInstallModal,
    onInstallClick,
  } = usePWA();

  const isPageWithInstallButton =
    pathname !== RouterPath.WorkoutEditor &&
    pathname !== RouterPath.RoutineEditor;

  const showBackButton =
    pathname === RouterPath.WorkoutEditor ||
    pathname === RouterPath.RoutineEditor;

  const showSignOutButton = pathname === RouterPath.Training;

  const onBackClick = () => {
    if (pathname === RouterPath.WorkoutEditor) push(RouterPath.Workouts);
    else back();
  };

  // SCROLL EFFECT ON HEADER HEIGHT
  const scrollTrigger = useScrollTrigger({
    threshold: 10,
  });

  return (
    <>
      <Box className={classes.headerBg} role="presentation" />
      <AppBar
        className={classes.root}
        elevation={1}
        sx={{ height: scrollTrigger ? 40 : 56 }}
      >
        <Toolbar id="header-toolbar" className={classes.toolbar}>
          <Box
            id="left-controls"
            display="flex"
            justifyContent="flex-start"
            sx={{ flex: 1 }}
          >
            {showSignOutButton && (
              <IconButton onClick={signOut}>
                <SignOutIcon
                  fontSize="small"
                  sx={{ transform: "scaleX(-1)" }}
                />
              </IconButton>
            )}
            {showBackButton && (
              <IconButton onClick={onBackClick}>
                <BackIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
          <Typography variant="h6" component="h1" noWrap>
            {ROUTE_SETTINGS[pathname as RouterPath]?.title}
          </Typography>

          <Box
            id="right-controls"
            display="flex"
            justifyContent="flex-end"
            sx={{ flex: 1 }}
          >
            {isPageWithInstallButton && showInstallButton && (
              <>
                <IconButton
                  onClick={onInstallClick}
                  className={classes.installButton}
                >
                  <DownloadIcon />
                </IconButton>
                <IOSInstallInstructionsModal
                  show={showIOSInstallModal}
                  hide={hideIOSInstallModal}
                />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
