import React, { useState, useEffect, createContext } from "react";

import { auth } from "../firebase/config";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { RouterPath } from "../resources/routes";
import { useAuth } from "../hooks/useAuth";
import { Box, CircularProgress } from "@mui/material";

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

    const { push, pathname } = useRouter();

    useEffect(() => {
      if (!user)
        push({ pathname: RouterPath.Login, query: { from: pathname } });
    }, [pathname, user]);

    if (!user)
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100vw", height: "100vh" }}
        >
          <CircularProgress />
        </Box>
      );

    return <Component {...props} />;
  };
  WithAuth.displayName = "withAuth";
  return WithAuth;
};
