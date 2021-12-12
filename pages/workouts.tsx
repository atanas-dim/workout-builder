import React from "react";
import MainContentWrapper from "../components/mainContent/MainContentWrapper";

//Using getServerSideProps to authenticate token for private routes
export { getServerSideProps } from "../utilities/ssrHelpers/authInServerSideProps";

export default function Workouts() {
  return <MainContentWrapper>Workouts</MainContentWrapper>;
}
