import { createTheme } from "@mui/material/styles";
import { blueGrey, pink, lime, lightBlue } from "@mui/material/colors";
import { isMobile } from "react-device-detect";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: lightBlue[300],
      light: lightBlue[100],
    },
    secondary: {
      main: lime[300],
      light: lime[100],
    },
    error: {
      main: pink[500],
    },
    background: {
      // default: "#121214",
      // paper: "#25252d",

      default: "#000",
      paper: "#19191f",
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
          fontSize: 16,
        },
        body: {
          overflowX: "hidden",
          maxWidth: "100vw",
        },
        "#__next": {
          width: "100%",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:active, input:-webkit-autofill:focus":
            {
              WebkitBoxShadow: `0 0 0 100px ${blueGrey[900]} inset !important`,
              backgroundColor: `${blueGrey[900]} !important`,
              backgroundClip: "content-box !important",
            },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "6px 24px",
          borderRadius: 999,
          minWidth: "auto",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "&.smallInput": {
            "& label": {
              left: 8,
            },
            "& legend": {
              marginLeft: 8,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          input: {
            paddingLeft: 18,
            paddingRight: 18,
          },

          "& legend": {
            marginLeft: 16,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          left: 16,
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          ...(isMobile && { bottom: "24px !important" }),
          margin: "auto 16px",
        },
      },
    },
  },
});

// console.log({ theme });

export default theme;
