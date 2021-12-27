import { createTheme } from "@mui/material/styles";
import { cyan, yellow, blueGrey } from "@mui/material/colors";

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
    background: {
      default: "#121214",
      paper: "#191a1f",
    },
    text: {
      // primary: cyan[100],
    },
  },
  shape: {
    borderRadius: 8,
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
  },
});

// console.log({ theme });

export default theme;
