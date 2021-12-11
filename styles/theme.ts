import { createTheme } from "@mui/material/styles";
import { cyan, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: cyan[300],
      light: cyan[100],
    },
    secondary: {
      main: yellow[300],
      light: yellow[100],
    },
    background: {
      default: "#121212",
      // default: "#040607",
      // paper: "#040607",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
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
