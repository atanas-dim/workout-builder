import React, { useEffect } from "react";
import type { NextPage } from "next";

import { useRouter } from "next/router";

import { RouterPath } from "../resources/routes";

import SignUp from "../components/auth/SignUp";
import useAuth from "../hooks/useAuth";

import { Box, Container, Typography } from "@mui/material";
import ActionButton from "../components/buttons/ActionButton";

const Register: NextPage = () => {
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
        backgroundColor: "background.default",
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
          fullWidth
          href={RouterPath.Login}
        />
      </Container>
    </Box>
  );
};

export default Register;
