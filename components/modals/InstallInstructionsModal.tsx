import React, { FC } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

import { Modal, Card, Typography, IconButton } from "@mui/material";
import {
  IosShare as ShareIcon,
  AddBoxOutlined as AddIcon,
} from "@mui/icons-material/";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.background.default, 0.8),
  },
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: theme.breakpoints.values.sm,
    outline: "none !important",
  },
}));

type Props = {
  showModal: boolean;
  hideModal: () => void;
};

const InstallInstructionsModal: FC<Props> = ({ showModal, hideModal }) => {
  const classes = useStyles();

  return (
    <Modal open={showModal} onClose={hideModal} className={classes.root}>
      <Card elevation={3} className={classes.card} variant="outlined">
        <Typography component="span" variant="body2" align="center">
          For best experience
        </Typography>
        <Typography component="span" variant="h6" align="center" sx={{ mb: 4 }}>
          Install the app
        </Typography>
        <Typography paragraph>
          1. Tap the 'Share Button'
          {<ShareIcon fontSize="small" sx={{ ml: 1 / 4 }} />} at the bottom of
          the browser
        </Typography>
        <Typography paragraph>
          2. Scroll (if needed) to find the 'Add to Home Screen'
          {<AddIcon fontSize="small" sx={{ ml: 1 / 4 }} />} button
        </Typography>
        <Typography paragraph>3. Tap 'Add'</Typography>
      </Card>
    </Modal>
  );
};

export default InstallInstructionsModal;
