import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "animate.css/animate.min.css";

import Head from "next/head";
import { useRouter } from "next/router";
import { AppProps } from "next/app";

import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";

import { OnlineStatusProvider } from "../context/OnlineStatusContext";
import { AuthProvider } from "../context/AuthContext";
import { SnackbarProvider } from "../context/SnackbarContext";
import { RoutinesProvider } from "../context/RoutinesContext";
import { WorkoutsProvider } from "../context/WorkoutsContext";
import { PWAProvider } from "../context/PWAContext";

import { CssBaseline } from "@mui/material/";
import theme from "../styles/theme";

import Header from "../components/header/Header";
import BottomNav from "../components/bottomNav/BottomNav";

import { RouterPath, ROUTE_SETTINGS } from "../resources/routes";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const showHeader = ROUTE_SETTINGS[router.pathname as RouterPath]?.appBar;
  const showBottomNav =
    ROUTE_SETTINGS[router.pathname as RouterPath]?.bottomNavValue !== undefined;

  return (
    <>
      <Head>
        {/* PWA  */}
        <link rel="manifest" href="/manifest.json" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge, chrome=1" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="apple-touch-icon" href="/icon.png"></link>

        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* 
        <link
          href="/images/splash/apple_splash_2048.png"
          sizes="2048x2732"
          rel="apple-touch-startup-image"
        />
        <link
          href="/images/splash/apple_splash_1668.png"
          sizes="1668x2224"
          rel="apple-touch-startup-image"
        />
        <link
          href="/images/splash/apple_splash_1536.png"
          sizes="1536x2048"
          rel="apple-touch-startup-image"
        />
        <link
          href="/images/splash/apple_splash_1125.png"
          sizes="1125x2436"
          rel="apple-touch-startup-image"
        />
        <link
          href="/apple_splash_1242.png"
          sizes="1242x2208"
          media="(device-width: 414px) and (device-height: 736px)
                     and (-webkit-device-pixel-ratio: 3)
                     and (orientation: portrait)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/images/splash/apple_splash_750.png"
          sizes="750x1334"
          media="(device-width: 375px) and (device-height: 667px)
                     and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/images/splash/apple_splash_640.png"
          sizes="640x1136"
          media="(device-width: 320px) and (device-height: 568px)
                     and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        /> */}

        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="splash_screens/12.9__iPad_Pro_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="splash_screens/10.5__iPad_Air_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="splash_screens/10.2__iPad_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          href="splash_screens/iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          href="splash_screens/iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          href="splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          href="splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="splash_screens/iPhone_11__iPhone_XR_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          href="splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="splash_screens/12.9__iPad_Pro_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="splash_screens/10.5__iPad_Air_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="splash_screens/10.2__iPad_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          href="splash_screens/iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          href="splash_screens/iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          href="splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          href="splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="splash_screens/iPhone_11__iPhone_XR_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          href="splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
        />

        {/* Favicon Links */}
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" href="/icons/icon-72.png" />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <PWAProvider>
            <OnlineStatusProvider>
              <AuthProvider>
                <SnackbarProvider>
                  <RoutinesProvider>
                    <WorkoutsProvider>
                      {showHeader && <Header />}
                      <Component {...pageProps} />
                      {showBottomNav && <BottomNav />}
                    </WorkoutsProvider>
                  </RoutinesProvider>
                </SnackbarProvider>
              </AuthProvider>
            </OnlineStatusProvider>
          </PWAProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default MyApp;
