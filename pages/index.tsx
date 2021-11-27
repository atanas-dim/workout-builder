import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { Box, Typography, Button } from "@mui/material/";

import { signOutUser } from "../firebase/config";

import { firestore } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

//Using getServerSideProps to authenticate token for private routes
export { getServerSideProps } from "../utilities/ssrHelpers/authInServerSideProps";

const Home: NextPage = () => {
  const { user } = useAuth();
  useEffect(() => {
    console.log({ user });
    // if (user) fetchTestData(user.uid);
  }, [user]);

  const fetchTestData = async (uid: string) => {
    const docRef = doc(firestore, "users", uid);

    const docSnap = await getDoc(docRef);
    console.log({ docSnap });

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
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
        <Button variant="contained" href="/welcome">
          Go to welcome page
        </Button>

        <Button variant="contained" onClick={() => signOutUser()}>
          Sign out
        </Button>
      </main>
    </div>
  );
};

export default Home;
