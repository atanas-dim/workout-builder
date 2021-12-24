import { createTheme } from "@mui/material/styles";
import { cyan, yellow } from "@mui/material/colors";

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
      default: "rgb(18 18 20)",
      paper: "rgb(23 24 28)",
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
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #3c3c3c inset !important",
          },
        },
      },
    },
  },
});

// console.log({ theme });

export default theme;
