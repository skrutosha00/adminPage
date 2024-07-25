import { CSSProperties } from "react";

import styles from "./textLoader.module.css";

export default function TextLoader({ width, height }: CSSProperties) {
  return <div className={styles.loader} style={{ width, height }}></div>;
}
