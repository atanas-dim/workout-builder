import { FC } from "react";
import Link from "next/link";
import { Button, Typography } from "@mui/material";

import { alpha } from "@mui/system";
import { styled } from "@mui/system";

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
  };
});

type Props = {
  variant?: "text" | "outlined" | "contained" | undefined;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  label: string;
  onClick?: () => void;
  sx?: object;
  href?: string;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large" | undefined;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};

const ActionButton: FC<Props> = ({
  variant = "outlined",
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
  if (href)
    return (
      <Link href={href} passHref>
        <StyledButton
          size={size}
          variant={variant}
          color={color}
          endIcon={endIcon}
          fullWidth={fullWidth}
          sx={sx}
          className={className}
          disabled={disabled}
        >
          <Typography component="span" variant="button" noWrap>
            {label}
          </Typography>
        </StyledButton>
      </Link>
    );

  return (
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
};

export default ActionButton;
