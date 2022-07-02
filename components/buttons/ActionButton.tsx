import { FC } from "react";
import Link from "next/link";
import { Button, Typography, ButtonProps } from "@mui/material";

import { SxProps, alpha, styled } from "@mui/system";

const StyledButton = styled(Button, {
  shouldForwardProp: (prop: string) => prop !== "classes",
})(({ size, color = "primary", variant, theme }) => {
  const themeColor = color !== "inherit" ? theme.palette[color].main : "#fff";

  return {
    height: size === "large" ? 64 : size === "medium" ? 48 : "",
    lineHeight: "initial",

    borderColor: variant === "outlined" ? alpha(themeColor, 0.4) : "",
    backgroundColor: variant === "outlined" ? alpha(themeColor, 0.08) : "",
    "&:focus, &:active, &:hover": {
      borderColor: variant === "outlined" ? themeColor : "",
    },

    ...(size === "small" && {
      padding: theme.spacing(0.5, 1.5),
      minHeight: "auto",
      lineHeight: 1,
      height: 32,
      "& > .MuiButton-endIcon": {
        marginLeft: theme.spacing(0.5),
      },
    }),

    ...(variant === "text" && {
      backgroundColor: alpha(themeColor, 0.08),
      "&:hover": {
        backgroundColor: alpha(themeColor, 0.16),
      },
    }),
  };
});

type Props = ButtonProps & {
  label: string;
  sx?: SxProps;
};

const ActionButton: FC<Props> = ({
  variant = "text",
  color = "primary",
  label,
  onClick,
  sx,
  href,
  endIcon,
  fullWidth,
  size = "medium",
  className,
  disabled,
  type,
}) => {
  const component = (
    <StyledButton
      type={type}
      size={size}
      variant={variant}
      color={color}
      endIcon={endIcon}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={sx}
      className={className}
      disabled={disabled}
    >
      <Typography component="span" variant="button" noWrap>
        {label}
      </Typography>
    </StyledButton>
  );

  if (href)
    return (
      <Link href={href} passHref>
        {component}
      </Link>
    );

  return component;
};

export default ActionButton;
