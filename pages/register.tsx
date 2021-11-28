import React, { useEffect } from "react";
import { useRouter } from "next/router";
import SignUp from "../components/auth/SignUp";
import { useAuth } from "../context/AuthContext";

import { Box, Container, Button } from "@mui/material";

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
      sx={{ width: "100vw", height: "100vh" }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SignUp />
        or
        <Button variant="text" href="/login">
          Use existing account
        </Button>
      </Container>
    </Box>
  );
}
