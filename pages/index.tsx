import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { withPrivate } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

import { Typography } from "@mui/material/";
import ActionButton from "../components/buttons/ActionButton";
import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import CurrentRoutine from "../components/routine/CurrentRoutine";

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
        {/* TODO Add message here about prev workout with date trained */}
        {/* <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Hi {user?.displayName} 💪
        </Typography> */}

        <CurrentRoutine />

        <ActionButton label="Sign out" onClick={() => signOut()} />
      </MainContentWrapper>
    </>
  );
};

export default withPrivate(Home);
