import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { Box, Typography, Button } from "@mui/material/";

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
    <div className={styles.container}>
      <Head>
        <title>Workout Builder</title>
        <meta name="Workout Builder" content="Workout Builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Welcome
        </Typography>

        <Button variant="contained" onClick={handleSignOut}>
          Sign out
        </Button>
      </main>
    </div>
  );
};

export default Home;
