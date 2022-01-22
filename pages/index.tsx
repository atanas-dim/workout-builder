import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Head from "next/head";

import { Box, Typography, Button } from "@mui/material/";
import MainContentWrapper from "../components/mainContent/MainContentWrapper";
import ActionButton from "../components/buttons/ActionButton";

import { signOutUser } from "../firebase/config";

import { useAuth } from "../context/AuthContext";

//Using getServerSideProps to authenticate token for private routes
export { getServerSideProps } from "../utilities/ssrHelpers/authInServerSideProps";

const Home: NextPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log({ user });
  }, [user]);

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
