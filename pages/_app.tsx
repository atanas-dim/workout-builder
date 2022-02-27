import "../styles/globals.css";

import { useRouter } from "next/router";

import { AppProps } from "next/app";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { AuthProvider } from "../context/AuthContext";
import { WorkoutsProvider } from "../context/WorkoutsContext";

import { CssBaseline } from "@mui/material/";
import theme from "../styles/theme";

import Header from "../components/header/Header";
import BottomNav from "../components/bottomNav/BottomNav";

import { RouterPath, ROUTE_SETTINGS } from "../resources/routes";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <AuthProvider>
            <WorkoutsProvider>
              {ROUTE_SETTINGS[router.pathname as RouterPath]?.appBar && (
                <Header />
              )}
              <Component {...pageProps} />
              {ROUTE_SETTINGS[router.pathname as RouterPath]?.bottomNavValue !==
                undefined && <BottomNav />}
            </WorkoutsProvider>
          </AuthProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default MyApp;
