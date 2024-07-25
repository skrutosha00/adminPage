import { ReactNode, useEffect } from "react";
import SimpleBar from "simplebar-react";

import styles from "./sidebar.module.css";
import backIcon from "@/assets/images/arrow.svg";
import useDelayUnmount from "@/hooks/useDelayUnmount";

const animationSpeed = 300;

type TProps = {
  isMounted: boolean;
  children?: ReactNode;
  close: () => void;
};

export default function Sidebar({ isMounted, children, close }: TProps) {
  const isShown = useDelayUnmount(isMounted, animationSpeed);

  const visabilityClass = isMounted ? "visible" : "invisible";

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
      {isShown && (
        <>
          <div className={styles.wrapper}>
            <section className={`${styles.sidebar} ${styles[visabilityClass]}`}>
              <SimpleBar autoHide={false} style={{ height: "100%" }}>
                <div className={styles.content}>
                  <img src={backIcon} alt="back icon" className={styles.back} onClick={close} />
                  {children}
                </div>
              </SimpleBar>
            </section>
          </div>
          <div className={`${styles.overlay} ${styles[visabilityClass]}`} onClick={overlayClickHandler}></div>
        </>
      )}
    </>
  );
}
