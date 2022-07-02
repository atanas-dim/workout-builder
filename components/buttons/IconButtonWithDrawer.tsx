import React, { FC, ReactNode, useState, PropsWithChildren } from "react";

import { IconButton, Box, SwipeableDrawer, Typography } from "@mui/material";

type Props = {
  icon: ReactNode;
  drawerHeading?: string;
};

const IconButtonWithDrawer: FC<PropsWithChildren<Props>> = ({
  children,
  icon,
  drawerHeading,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleOpen = () => {
    setShowDrawer(true);
  };

  const handleClose = () => {
    setShowDrawer(false);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>{icon}</IconButton>
      <SwipeableDrawer
        anchor={"bottom"}
        open={showDrawer}
        onClose={handleClose}
        onOpen={handleOpen}
        elevation={1}
        PaperProps={{
          sx: (theme) => ({
            borderRadius: "12px 12px 0 0",
            p: 4,
            pt: 2,
            pb: 6,
            mx: "auto",
            maxWidth: theme.breakpoints.values.md,
          }),
        }}
      >
        <Box
          component="span"
          sx={{
            m: "auto",
            mb: 2,
            height: 4,
            width: 40,
            backgroundColor: "divider",
            borderRadius: 4,
          }}
        />
        {!!drawerHeading && (
          <Typography
            component="span"
            variant="button"
            noWrap
            align="center"
            sx={{ mb: 2 }}
          >
            {drawerHeading}
          </Typography>
        )}
        {children}
      </SwipeableDrawer>
    </>
  );
};

export default IconButtonWithDrawer;
