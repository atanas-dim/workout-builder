import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import router from "next/router";

export default function useUser() {
  const { user } = useAuth();

  return { user };
}
