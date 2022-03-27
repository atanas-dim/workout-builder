import { useContext } from "react";
import { OnlineStatusContext } from "../context/OnlineStatusContext";

export const useOnlineStatus = () => {
  const { online } = useContext(OnlineStatusContext);
  return { online };
};
