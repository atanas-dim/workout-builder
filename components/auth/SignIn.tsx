import React, { useState } from "react";
import { TextField, Button } from "@mui/material/";

import { signIn } from "../../firebase/config";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (!email || !password) return;
    signIn(email, password);
  };

  return (
    <>
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
      <Button variant="contained" fullWidth onClick={handleSignIn}>
        Sign In
      </Button>
    </>
  );
}
