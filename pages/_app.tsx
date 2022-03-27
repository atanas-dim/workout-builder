import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import Head from "next/head";
import { useRouter } from "next/router";
import { AppProps } from "next/app";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { OnlineStatusProvider } from "../context/OnlineStatusContext";
import { AuthProvider } from "../context/AuthContext";
import { SnackbarProvider } from "../context/SnackbarContext";
import { RoutinesProvider } from "../context/RoutinesContext";
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
      <Head>
        {/* PWA  */}
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="apple-touch-icon" href="/icon.png"></link>

        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {/* Favicon Links */}
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" href="/icons/icon-72.png" />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <OnlineStatusProvider>
            <AuthProvider>
              <SnackbarProvider>
                <RoutinesProvider>
                  <WorkoutsProvider>
                    {ROUTE_SETTINGS[router.pathname as RouterPath]?.appBar && (
                      <Header />
                    )}
                    <Component {...pageProps} />
                    {ROUTE_SETTINGS[router.pathname as RouterPath]
                      ?.bottomNavValue !== undefined && <BottomNav />}
                  </WorkoutsProvider>
                </RoutinesProvider>
              </SnackbarProvider>
            </AuthProvider>
          </OnlineStatusProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default MyApp;
