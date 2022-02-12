import React from "react";
import { Button } from "@mui/material";

function Welcome() {
  return (
    <div>
      <h1>Welcome screen</h1>
      <Button variant="contained" href="/">
        Go to home
      </Button>
    </div>
  );
}

export default Welcome;
