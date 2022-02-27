import { createTheme } from "@mui/material/styles";
import { cyan, blueGrey, pink, lime } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: cyan[200],
      light: cyan[100],
    },
    secondary: {
      main: lime[300],
      light: lime[100],
    },
    error: {
      main: pink[500],
    },
    background: {
      default: "#121214",
      paper: "#191a1f",
    },
  },
  shape: {
    borderRadius: 12,
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
  },
});

// console.log({ theme });

export default theme;
