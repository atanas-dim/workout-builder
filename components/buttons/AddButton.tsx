import { FC } from "react";
import Link from "next/link";
import { Card, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 64,
    marginBottom: theme.spacing(2),
    borderColor: alpha(theme.palette.primary.main, 0.4),
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    "&:focus, &:active, &:hover": {
      borderColor: alpha(theme.palette.primary.main, 0.4),
    },
  },
}));

type Props = {
  label: string;
  onClick?: () => void;
  sx?: object;
  href?: string;
};

const AddButton: FC<Props> = ({ label, onClick, sx, href }) => {
  const classes = useStyles();

  if (href)
    return (
      <Link href={href} passHref>
        <Button
          variant="outlined"
          fullWidth
          endIcon={<AddIcon />}
          className={classes.root}
          sx={sx}
        >
          {label}
        </Button>
      </Link>
    );

  return (
    <Button
      variant="outlined"
      fullWidth
      endIcon={<AddIcon />}
      onClick={onClick}
      className={classes.root}
      sx={sx}
    >
      {label}
    </Button>
  );
};

export default AddButton;
