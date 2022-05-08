import React, { FC } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

import { Modal, Card, Typography, IconButton } from "@mui/material";
import {
  IosShareRounded as ShareIcon,
  AddBoxRounded as AddIcon,
  CancelRounded as CloseIcon,
} from "@mui/icons-material/";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.background.default, 0.8),
  },
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2, 3, 3, 3),
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: theme.breakpoints.values.sm,
    outline: "none !important",
    position: "relative",
  },
}));

type Props = {
  show: boolean;
  hide: () => void;
};

const IOSInstallInstructionsModal: FC<Props> = ({ show, hide }) => {
  const classes = useStyles();

  return (
    <Modal open={show} onClose={hide} className={classes.root}>
      <Card className={classes.card} elevation={1}>
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={hide}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          component="span"
          variant="h6"
          align="center"
          sx={{ mt: 0.5, mb: 4 }}
        >
          Add to Home Screen
        </Typography>
        <Typography paragraph>
          1. Tap the &#39;Share Button&#39;
          {<ShareIcon fontSize="small" sx={{ ml: 1 / 4 }} />} at the bottom of
          the browser
        </Typography>
        <Typography paragraph>
          2. Scroll (if needed) to find the &#39;Add to Home Screen&#39;
          {<AddIcon fontSize="small" sx={{ ml: 1 / 4 }} />} button
        </Typography>
        <Typography paragraph>3. Tap &#39;Add&#39;</Typography>
      </Card>
    </Modal>
  );
};

export default IOSInstallInstructionsModal;
