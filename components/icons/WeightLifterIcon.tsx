import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function WeightLifterIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 5C10.89 5 10 5.89 10 7C10 8.11 10.89 9 12 9C13.11 9 14 8.11 14 7C14 5.89 13.11 5 12 5ZM22 1V6H20V4H4V6H2V1H4V3H20V1H22ZM15 11.26V23H13V18H11V23H9V11.26C6.93 10.17 5.5 8 5.5 5.5V5H7.5V5.5C7.5 8 9.5 10 12 10C14.5 10 16.5 8 16.5 5.5V5H18.5V5.5C18.5 8 17.07 10.17 15 11.26Z" />
    </SvgIcon>
  );
}
