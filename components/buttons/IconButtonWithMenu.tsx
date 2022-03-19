import React, { FC, useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";

type Props = {
  id: string;
  icon: React.ReactNode;
  menuTitle?: string;
  menuItems: {
    label: string;
    onClick: (attr: any) => any;
  }[];
};
const IconButtonWithMenu: FC<Props> = ({ id, icon, menuTitle, menuItems }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMoreClick = (anchorId: string) => {
    setMenuAnchorEl(document.getElementById(anchorId));
  };

  return (
    <>
      <IconButton
        id={"more-button-" + id}
        onClick={() => handleMoreClick("more-button-" + id)}
      >
        {icon}
      </IconButton>

      <Menu
        id={"menu-" + id}
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
      >
        {!!menuTitle && (
          <Typography
            component="span"
            variant="overline"
            sx={(theme) => ({
              width: "100%",
              color: theme.palette.grey[400],
              m: 2,
            })}
          >
            {menuTitle}
          </Typography>
        )}
        {menuItems?.map((item, index) => (
          <MenuItem
            key={"menu-item-" + id + index}
            onClick={item.onClick}
            sx={{ minWidth: 120 }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default IconButtonWithMenu;