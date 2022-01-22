import { createTheme } from "@mui/material/styles";
import { cyan, yellow, blueGrey, pink } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: cyan[200],
      light: cyan[100],
    },
    secondary: {
      main: yellow[200],
      light: yellow[100],
    },
    error: {
      main: pink[500],
    },
    background: {
      default: "#121214",
      paper: "#191a1f",
    },
    text: {
      // primary: cyan[100],
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflowX: "hidden",
        },
        "#__next": {
          width: "100vw",
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          // paddingLeft: 0,
          input: {
            padding: "16.5px 24px",
          },
          "& legend": {
            marginLeft: 12,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          left: 12,
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        positionStart: {
          // position: "absolute",
          // left: 24,
        },
      },
    },
  },
});

// console.log({ theme });

export default theme;
