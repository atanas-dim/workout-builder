import { useContext } from "react";
import { SnackbarContext } from "../context/SnackbarContext";

export default function useSnackbar() {
  const { setShowSnack } = useContext(SnackbarContext);

  return {
    setShowSnack,
  };
}
