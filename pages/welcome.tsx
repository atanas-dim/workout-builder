import React from "react";
import type { NextPage } from "next";

import { Button } from "@mui/material";
import { withPrivate } from "../context/AuthContext";

const Welcome: NextPage = () => {
  return (
    <div>
      <h1>Welcome screen</h1>
      <Button variant="contained" href="/">
        Go to home
      </Button>
    </div>
  );
};

export default withPrivate(Welcome);
