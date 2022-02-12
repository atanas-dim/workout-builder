import React, { useState, useEffect, createContext } from "react";

import { auth } from "../firebase/config";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { RouterPath, ROUTE_VALUES } from "../pages/_app";

export const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

// Code example - https://colinhacks.com/essays/nextjs-firebase-authentication
export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const { push, pathname } = useRouter();

  useEffect(() => {
    if (!user && ROUTE_VALUES[pathname as RouterPath].private)
      push({ pathname: RouterPath.Login, query: { from: pathname } });
  }, [pathname]);

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
