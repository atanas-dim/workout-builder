import React, { FC, ReactNode, useState } from "react";

import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@mui/material";

import { TransitionProps } from "@mui/material/transitions";

import ActionButton from "./ActionButton";

type Props = {
  icon: ReactNode;
  onConfirmClick: (args?: any) => any;
  confirmLabel: string;
  heading: string;
  message?: string;
};

const IconButtonWithConfirm: FC<Props> = ({
  icon,
  onConfirmClick,
  confirmLabel,
  heading,
  message,
}) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleOpen = () => {
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>{icon}</IconButton>

      <Dialog
        open={showDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="delete-dialog"
      >
        <DialogTitle>{heading}</DialogTitle>
        <DialogContent>
          {!!message && (
            <DialogContentText id="delete-dialog-content-text">
              {message}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions sx={{ padding: "8px 24px 16px" }}>
          <ActionButton
            onClick={handleClose}
            variant="contained"
            label="Cancel"
          />
          <ActionButton
            onClick={onConfirmClick}
            variant="contained"
            color="error"
            label={confirmLabel}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IconButtonWithConfirm;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
