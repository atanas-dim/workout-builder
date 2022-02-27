import type { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";

import { Typography } from "@mui/material/";
import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import ActionButton from "../components/buttons/ActionButton";

import { useAuth } from "../hooks/useAuth";

const Home: NextPage = () => {
  const { user, signOut } = useAuth();

  return (
    <>
      <Head>
        <title>Workout Builder</title>
        <meta name="Workout Builder" content="Workout Builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContentWrapper>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Hi {user?.displayName} 💪
        </Typography>

        <ActionButton
          label="Sign out"
          variant="outlined"
          onClick={() => signOut()}
        />
      </MainContentWrapper>
    </>
  );
};

export default Home;
