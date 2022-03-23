import React, { FC, useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";

type Props = {
  id: string;
  icon: React.ReactNode;
  menuTitle?: string;
  menuItems: {
    label: string;
    onClick: (attr?: any) => any;
  }[];
};
const IconButtonWithMenu: FC<Props> = ({ id, icon, menuTitle, menuItems }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMoreClick = (anchorId: string) => {
    setMenuAnchorEl(document.getElementById(anchorId));
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id={"more-button-" + id}
        onClick={() => handleMoreClick("more-button-" + id)}
      >
        {icon}
      </IconButton>

      {
        <Menu
          id={"menu-" + id}
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(menuAnchorEl)}
          onClick={handleClose}
          onClose={handleClose}
        >
          {!!menuTitle && (
            <Typography
              component="span"
              variant="overline"
              sx={(theme) => ({
                width: "100%",
                opacity: 0.7,
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
      }
    </>
  );
};

export default IconButtonWithMenu;
