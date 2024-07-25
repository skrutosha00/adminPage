import { createPortal } from "react-dom";
import { ReactNode, useEffect } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import styles from "./modal.module.css";
import backDesctopImage from "@/assets/images/back.svg";
import closeDesctopImage from "@/assets/images/cross.svg";
import backMobileImage from "@/assets/images/back_mobile.svg";
import closeMobileImage from "@/assets/images/cross_mobile.svg";
import useDelayUnmount from "@/hooks/useDelayUnmount";
import useScreenSize from "@/hooks/useScreenSize";
import getParamClass from "@/utils/getParamClass";
import getSuitableSize from "@/utils/getSuitableSize";
import { TSize } from "@/services/types";

type TProps = {
  isMounted: boolean;
  children?: ReactNode;
  close: () => void;
  backClickHandler?: () => void;
};

const animationSpeed = 300;
const supportedSizes: TSize[] = ["s", "m"];
const portalTarget = document.querySelector("#modal") as HTMLDivElement;

export default function Modal({ isMounted, children, close, backClickHandler }: TProps) {
  const size = useScreenSize();
  const isShown = useDelayUnmount(isMounted, animationSpeed);

  const suitableSize = getSuitableSize({ size, supportedSizes });
  const sizeClass = getParamClass("size", suitableSize);
  const visabilityClass = isMounted ? "visible" : "invisible";

  const isMobile = suitableSize === "s";
  const backImage = isMobile ? backMobileImage : backDesctopImage;
  const closeImage = isMobile ? closeMobileImage : closeDesctopImage;

  useEffect(() => {
    document.addEventListener("keydown", keyPressHandler);

    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, []);

  function keyPressHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {
      close();
    }
  }

  function overlayClickHandler() {
    close();
  }

  return (
    <>
      {isShown &&
        createPortal(
          <>
            <section className={`${styles.modal} ${styles[visabilityClass]} ${styles[sizeClass]}`}>
              <SimpleBar style={{ height: "100%" }}>
                <div style={{ padding: "20px" }}>
                  <img src={closeImage} alt="close" className={styles.closeImage} onClick={() => close()} />
                  {backClickHandler && (
                    <img src={backImage} alt="back" className={styles.backImage} onClick={() => backClickHandler()} />
                  )}
                  {children}
                </div>
              </SimpleBar>
            </section>
            <div className={`${styles.overlay} ${styles[visabilityClass]}`} onClick={overlayClickHandler}></div>
          </>,
          portalTarget
        )}
    </>
  );
}
