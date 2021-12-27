import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SignIn from "../components/auth/SignIn";
import { useAuth } from "../context/AuthContext";

import { Box, Button, Container, Typography } from "@mui/material";

export default function Login() {
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
        <SignIn />
        <Typography component="span" variant="button" sx={{ mt: 2, mb: 2 }}>
          or
        </Typography>
        <Button variant="outlined" fullWidth href="/register">
          Create account
        </Button>
      </Container>
    </Box>
  );
}
