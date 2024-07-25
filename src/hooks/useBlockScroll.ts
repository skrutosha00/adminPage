import { historySelector, settingsSelector } from "@/services/selectors";
import { useEffect } from "react";
import { useAppSelector } from "./useAppSelector";

export default function useBlockScroll() {
  const history = useAppSelector(historySelector());
  const { isOpen } = useAppSelector(settingsSelector());

  const isBlocked = !!history.length || isOpen;

  useEffect(() => {
    if (isBlocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });
}
