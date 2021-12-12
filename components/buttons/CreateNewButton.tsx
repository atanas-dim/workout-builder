import { FC } from "react";
import { Card, Typography, Button } from "@mui/material";
import { Add as PlusIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 64,
    marginBottom: theme.spacing(2),
    borderColor: alpha(theme.palette.secondary.main, 0.4),
    backgroundColor: alpha(theme.palette.secondary.main, 0.08),
    "&:focus, &:active, &:hover": {
      borderColor: alpha(theme.palette.secondary.main, 0.4),
    },
  },
}));

type Props = {
  option: "exercise" | "workout";
  onClick?: () => void;
  sx?: object;
};

const CreateNewButton: FC<Props> = ({ option, onClick, sx }) => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      fullWidth
      color="secondary"
      endIcon={<PlusIcon />}
      onClick={onClick}
      className={classes.root}
      sx={sx}
    >
      Create new {option}
    </Button>
  );
};

export default CreateNewButton;
