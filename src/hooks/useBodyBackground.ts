import { useEffect } from "react";

export default function useBodyBackground() {
  const background = `#e3ebf7`;

  useEffect(() => {
    document.body.style.background = background;

    return () => {
      document.body.style.background = "unset";
    };
  }, []);
}
