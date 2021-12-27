import { isMobileSafari, isChrome } from "react-device-detect";

export const isStandaloneOnChrome = () => {
  if (typeof window !== "undefined")
    return isChrome && window.matchMedia("(display-mode: standalone)").matches;
};

export const isStandaloneOnMobileSafari = () => {
  //@ts-ignore
  return isMobileSafari && window.navigator.standalone === true;
};
