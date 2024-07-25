import styles from "./loader.module.css";
import getParamClass from "@/utils/getParamClass";

type TProps = {
  width?: number | string;
  height?: number | string;
  type?: "main" | "secondary";
};

export default function Loader({ width = 40, height = 40, type = "main" }: TProps) {
  const typeClass = getParamClass("type", type);

  return <div className={`${styles.loader} ${styles[typeClass]}`} style={{ width, height }}></div>;
}
