import React, { FC, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

import {
  Modal,
  Card,
  Typography,
  TextField,
  Autocomplete,
  Paper,
} from "@mui/material";

import useRoutines from "../../hooks/useRoutines";
import ActionButton from "../buttons/ActionButton";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.background.default, 0.8),
  },
  card: {
    margin: theme.spacing(2, 2, 4),
    padding: theme.spacing(2, 3, 3, 3),
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: "visible",
    maxWidth: theme.breakpoints.values.sm,
    outline: "none !important",
    position: "relative",
  },
}));

type Props = {
  show: boolean;
  hide: () => any;
};

const SelectRoutineModal: FC<Props> = ({ show, hide }) => {
  const classes = useStyles();

  const {
    routines,
    currentRoutineId,
    setCurrentRoutine,
    updateCurrentRoutine,
  } = useRoutines();

  const [selectedRoutine, setSelectedRoutine] = useState<{
    label: string;
    id: string;
  }>();

  const onAutoCompleteChange = (event: React.SyntheticEvent, value: any) => {
    if (!value || !value.id) setSelectedRoutine(undefined);
    else setSelectedRoutine(value);
  };

  const options = routines.map((routine) => ({
    label: routine.title,
    id: routine.id,
  }));

  const handleSelectClick = () => {
    if (!selectedRoutine) return;

    if (!currentRoutineId) setCurrentRoutine(selectedRoutine.id);
    else updateCurrentRoutine(selectedRoutine.id);

    setSelectedRoutine(undefined);
    hide();
  };

  return (
    <Modal open={show} onClose={hide} className={classes.root}>
      <Card className={classes.card} elevation={1}>
        <Typography
          component="span"
          variant="h6"
          align="center"
          sx={{ mt: 0.5, mb: 4 }}
        >
          Select Routine
        </Typography>
        <Autocomplete
          disablePortal
          id="select-routine-autocomplete"
          options={options}
          onChange={onAutoCompleteChange}
          fullWidth
          PaperComponent={(props) => {
            return <Paper elevation={3} sx={{ maxHeight: 200 }} {...props} />;
          }}
          renderInput={(params) => <TextField {...params} label="Routines" />}
          isOptionEqualToValue={(option: any, value: any) =>
            option.label === value.label && option.id === value.id
          }
          sx={{ mb: 4 }}
        />
        <ActionButton
          label="Select"
          variant="contained"
          disabled={!selectedRoutine}
          onClick={handleSelectClick}
        />
      </Card>
    </Modal>
  );
};

export default SelectRoutineModal;
