import React, { FC } from "react";
import { Switch } from "@mui/material";

type Props = {
  checked?: boolean;
  onChange?: (arrg?: any) => any;
};
const LargeSwitch: FC<Props> = ({ checked, onChange }) => {
  return (
    <Switch
      sx={(theme) => ({
        width: 64,
        height: 32,
        m: theme.spacing(0, 1),
        p: 0,
        ".MuiSwitch-switchBase": { p: "6px" },
        ".Mui-checked": { transform: "translateX(32px) !important" },
        ".MuiSwitch-track": {
          bgcolor: `${theme.palette.grey[600]} !important`,
          borderRadius: 999,
          opacity: "0.3 !important",
        },
        ".MuiSwitch-thumb": { color: "secondary.main" },
      })}
      checked={checked}
      onChange={onChange}
    />
  );
};

export default LargeSwitch;
