import { createTheme } from "@mui/material/styles";
import { cyan, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: cyan[500],
    },
    secondary: {
      main: yellow[500],
    },
    background: {
      default: "#121212",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "#__next": {
          width: "100vw",
          height: "100vh",
        },
      },
    },
  },
});

export default theme;
