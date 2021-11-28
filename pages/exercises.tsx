import React, { useState, useEffect } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import { useAuth } from "../context/AuthContext";

import useExersizes from "../hooks/useExersizes";

//Using getServerSideProps to authenticate token for private routes
export { getServerSideProps } from "../utilities/ssrHelpers/authInServerSideProps";

export default function Exercises() {
  const { user } = useAuth();
  const [exersizeTitle, setExersizeTitle] = useState("");
  const { exersizesData, createExersize } = useExersizes();

  const onCreateClick = () => {
    if (!exersizeTitle) return;
    createExersize(exersizeTitle);
    setExersizeTitle("");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      style={{ maxWidth: 600, margin: "auto", padding: 80 }}
    >
      <TextField
        id="exersize-name"
        type="text"
        label="Exersize name"
        variant="outlined"
        sx={{ mb: 2 }}
        value={exersizeTitle}
        onChange={(e) => setExersizeTitle(e.target.value)}
      />
      <Button variant="contained" onClick={onCreateClick}>
        Create new exercise
      </Button>

      {exersizesData?.map((exersize) => {
        return (
          <Typography component="h2" variant="h4" key={exersize.id}>
            {exersize.title}
          </Typography>
        );
      })}
    </Box>
  );
}
