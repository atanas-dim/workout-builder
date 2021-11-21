import React from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@mui/material";

import nookies from "nookies";

import { firebaseAdmin } from "../firebase/adminSDK";

function Welcome({ uid, email, name }: any) {
  return (
    <div>
      <h1>Welcome {email}</h1>
      <Button variant="contained" href="/">
        Start
      </Button>
    </div>
  );
}

export const getServerSideProps = async (ctx: any) => {
  try {
    const cookies = nookies.get(ctx);

    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    // the user is authenticated!
    const { uid, email, name } = token;

    // FETCH STUFF HERE!!

    return {
      props: { uid, email, name: name || null },
    };
  } catch (err) {
    console.log({ err });

    if (err) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    // ctx.res.writeHead(302, { Location: "/login" });
    // ctx.res.end();

    return { props: {} as never };
  }
};

export default Welcome;
