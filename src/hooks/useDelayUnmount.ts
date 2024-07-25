import { useEffect, useState } from "react";

export default function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isMounted && !isShown) {
      setIsShown(true);
    } else if (!isMounted && isShown) {
      timeoutId = setTimeout(() => setIsShown(false), delayTime);
    }

    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, isShown]);
  return isShown;
}
