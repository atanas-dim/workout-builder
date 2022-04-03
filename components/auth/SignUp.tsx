import React, { useState } from "react";
import router from "next/router";
import { TextField, Box } from "@mui/material/";
import ActionButton from "../buttons/ActionButton";

import useAuth from "../../hooks/useAuth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { signUp } = useAuth();

  const handleSignUp = (e: any) => {
    e.preventDefault();
    if (!email || !password || !displayName) return;
    signUp(email, password, displayName);
    router.push("/welcome");
  };

  return (
    <Box component="form" sx={{ width: "100%" }} onSubmit={handleSignUp}>
      <TextField
        id="display-name"
        type="text"
        required
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
        required
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
        required
        label="Password"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ActionButton
        type="submit"
        label="Sign Up"
        variant="contained"
        fullWidth
      />
    </Box>
  );
}
