import { TSize } from "@/services/types";
import { useEffect, useState } from "react";

const sizes: { [key: number]: TSize } = {
  0: "xxs",
  320: "xs",
  360: "s",
  480: "m",
  720: "l",
  1024: "xl",
  1280: "xxl",
  1440: "xxxl"
};

export default function useScreenSize(): TSize {
  const [width, setWidth] = useState(window.innerWidth);
  let lastOvertaken: keyof typeof sizes = 0;

  for (let size in sizes) {
    if (width > +size) {
      lastOvertaken = +size;
    }
  }

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  function updateWidth() {
    setWidth(window.innerWidth);
  }

  return sizes[lastOvertaken];
}
