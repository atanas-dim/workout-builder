import React, { useState, useEffect, createContext, useRef } from "react";

import { auth } from "../firebase/config";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { RouterPath } from "../resources/routes";
import useAuth from "../hooks/useAuth";
import { Box, CircularProgress, useTheme } from "@mui/material";

export const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

// Code example - https://colinhacks.com/essays/nextjs-firebase-authentication
export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      // console.log({ user });
      console.log(`token changed!`);

      if (!user) {
        console.log(`no token found...`);
        setUser(null);

        return;
      }

      setUser(user);
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

// The HOC can wrap a page component on private routes
export const withAuth = (Component: any) => {
  const WithAuth = (props: any) => {
    const { user } = useAuth();
    const theme = useTheme();

    const { push, pathname } = useRouter();

    const [counter, setCounter] = useState(0);
    const interval = useRef<NodeJS.Timeout>();

    // Using counter to wait for firebase to return user on page load
    // If after 3 sec there's still no user then redirect
    // This fixes blinking of Login page when user is already logged in but auth.onIdTokenChanged hasn't returned the auth user yet
    useEffect(() => {
      if (!user) {
        startCountForRedirect();
      }
    }, [user]);

    const startCountForRedirect = () => {
      interval.current = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 1000);
    };

    useEffect(() => {
      if (counter >= 3) {
        if (interval.current) clearInterval(interval.current);
        if (!user)
          push({ pathname: RouterPath.Login, query: { from: pathname } });
      }
    }, [counter, user, interval, pathname, push]);

    if (!user)
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: theme.palette.background.default,
            zIndex: theme.zIndex.modal,
            position: "fixed",
          }}
        >
          <CircularProgress />
        </Box>
      );

    return <Component {...props} />;
  };
  WithAuth.displayName = "withAuth";
  return WithAuth;
};
