import React, { FC } from "react";

import useRoutines from "../../hooks/useRoutines";
import useWorkouts from "../../hooks/useWorkouts";

import { Typography, Box } from "@mui/material/";
import IconButtonWithMenu from "../../components/buttons/IconButtonWithMenu";

import { MoreHorizRounded as MoreIcon } from "@mui/icons-material";

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
        <IconButtonWithMenu
          id="edit-current-routine"
          icon={<MoreIcon fontSize="small" />}
          menuTitle=" Current Routine"
          menuItems={[
            {
              label: "Select",
              onClick: onSelectClick,
            },
          ]}
        />
      )}
    </Box>
  );
};

export default RoutineHeader;
