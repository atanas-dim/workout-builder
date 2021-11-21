import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material/";

import { signIn, signUp } from "../../firebase/config";
import router from "next/router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = () => {
    if (!email || !password || !name) return;
    signUp(email, password, name);
    router.push("/welcome");
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography component="h1" variant="h4">
          Sign Up
        </Typography>
        <TextField
          id="name"
          type="text"
          label="Name"
          variant="outlined"
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          sx={{ mb: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          variant="outlined"
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Box>
    </>
  );
}
