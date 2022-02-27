import React, { useState } from "react";
import router from "next/router";
import { TextField } from "@mui/material/";
import ActionButton from "../buttons/ActionButton";

import { useAuth } from "../../hooks/useAuth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { signUp } = useAuth();

  const handleSignUp = () => {
    if (!email || !password || !displayName) return;
    signUp(email, password, displayName);
    router.push("/welcome");
  };

  return (
    <>
      <TextField
        id="display-name"
        type="text"
        label="Display name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />

      <TextField
        id="email"
        type="email"
        label="Email"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ActionButton
        label="Sign Up"
        variant="contained"
        fullWidth
        onClick={handleSignUp}
      />
    </>
  );
}
