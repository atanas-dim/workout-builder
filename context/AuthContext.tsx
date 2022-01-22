import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import { auth } from "../firebase/config";
import { User } from "firebase/auth";

export const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

// Code example - https://colinhacks.com/essays/nextjs-firebase-authentication
export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies;
    }
    return auth.onIdTokenChanged(async (user) => {
      console.log({ user });
      console.log(`token changed!`);
      if (!user) {
        console.log(`no token found...`);
        setUser(null);
        nookies.destroy(null, "token");
        nookies.set(null, "token", "", { path: "/" });
        return;
      }

      console.log(`updating token...`);
      const token = await user.getIdToken();
      setUser(user);
      nookies.destroy(null, "token");
      nookies.set(null, "token", token, { path: "/" });
      nookies.set(null, "uid", user.uid, { path: "/" });
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

// Move to hooks
export const useAuth = () => {
  return useContext(AuthContext);
};
