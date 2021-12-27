import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material/";

import { signIn, signUp } from "../../firebase/config";
import router from "next/router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = () => {
    if (!email || !password || !firstName || !lastName) return;
    signUp(email, password, firstName, lastName);
    router.push("/welcome");
  };

  return (
    <>
      <TextField
        id="first-name"
        type="text"
        label="First name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        id="last-name"
        type="text"
        label="Last name"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
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
      <Button variant="contained" fullWidth onClick={handleSignUp}>
        Sign Up
      </Button>
    </>
  );
}
