import React from "react";

//Using getServerSideProps to authenticate token for private routes
export { getServerSideProps } from "../utilities/ssrHelpers/authInServerSideProps";

export default function Workouts() {
  return <div style={{ padding: 150 }}>Workouts</div>;
}
