import type { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";

import { Typography } from "@mui/material/";
import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import ActionButton from "../components/buttons/ActionButton";

import { signOutUser } from "../firebase/config";

import { useAuth } from "../hooks/useAuth";

const Home: NextPage = () => {
  const { user } = useAuth();

  const handleSignOut = () => {
    signOutUser();
  };

  return (
    <>
      <Head>
        <title>Workout Builder</title>
        <meta name="Workout Builder" content="Workout Builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContentWrapper>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Welcome {user?.displayName}
        </Typography>

        <ActionButton
          label="Sign out"
          variant="outlined"
          onClick={handleSignOut}
        />
      </MainContentWrapper>
    </>
  );
};

export default Home;
