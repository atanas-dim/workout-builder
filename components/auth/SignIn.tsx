import React, { useState } from "react";
import { TextField, Typography, Box } from "@mui/material/";
import ActionButton from "../buttons/ActionButton";

import { useAuth } from "../../hooks/useAuth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, error } = useAuth();

  const handleSignIn = (e: any) => {
    e.preventDefault();
    if (!email || !password) return;
    signIn(email, password);
  };

  return (
    <Box component="form" sx={{ width: "100%" }} onSubmit={handleSignIn}>
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
      {error && (
        <Typography component="p" variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <ActionButton
        type="submit"
        label="Sign In"
        variant="contained"
        fullWidth
      />
    </Box>
  );
}
