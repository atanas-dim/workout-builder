import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { RouterPaths } from "../pages/_app";

import SignUp from "../components/auth/SignUp";
import { useAuth } from "../context/AuthContext";

import { Box, Container, Button, Typography } from "@mui/material";
import ActionButton from "../components/buttons/ActionButton";

export default function Register() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "background.paper",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignUp />
        <Typography component="span" variant="button" sx={{ mt: 2, mb: 2 }}>
          or
        </Typography>
        <ActionButton
          label="Use existing account"
          variant="outlined"
          fullWidth
          href={RouterPaths.Login}
        />
      </Container>
    </Box>
  );
}
