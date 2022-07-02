import React, { FC } from "react";

import useRoutines from "../../hooks/useRoutines";
import useWorkouts from "../../hooks/useWorkouts";

import { Typography, Box } from "@mui/material/";
import IconButtonWithDrawer from "../buttons/IconButtonWithDrawer";

import { MoreHorizRounded as MoreIcon } from "@mui/icons-material";
import ActionButton from "../buttons/ActionButton";

type Props = {
  onSelectClick: () => void;
};

const RoutineHeader: FC<Props> = ({ onSelectClick }) => {
  const { currentRoutineId } = useRoutines();
  const { routineGroups } = useWorkouts();

  const currentRoutine = currentRoutineId
    ? routineGroups?.[currentRoutineId]
    : undefined;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Typography
        component="span"
        variant="overline"
        noWrap
        sx={{
          width: "100%",
          opacity: 0.7,
          ml: 1,
        }}
      >
        {currentRoutine?.title || "Current routine"}
      </Typography>

      {currentRoutineId && (
        <>
          <IconButtonWithDrawer
            icon={<MoreIcon fontSize="small" />}
            drawerHeading={"Current routine"}
          >
            <ActionButton
              label="Select"
              onClick={onSelectClick}
              fullWidth
              sx={{ maxWidth: 400, margin: "auto" }}
            />
          </IconButtonWithDrawer>
        </>
      )}
    </Box>
  );
};

export default RoutineHeader;
