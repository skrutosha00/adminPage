import { RefObject, useEffect } from "react";

export default function useIntersectObserver<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T>,
  callback: () => void
): void {
  useEffect(() => {
    let observer: IntersectionObserver | null;
    let didCancel = false;

    if (ref.current) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!didCancel && entries[0].isIntersecting) {
            callback();
            if (observer) observer.unobserve(ref.current as Element);
          }
        },
        { threshold: 0, rootMargin: "1000px" }
      );

      observer.observe(ref.current);
    }

    return () => {
      didCancel = true;
      if (observer) observer.disconnect();
    };
  }, [ref, callback]);
}
