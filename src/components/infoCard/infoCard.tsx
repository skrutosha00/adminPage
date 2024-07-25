import styles from "./infoCard.module.css";
import { TSize } from "@/services/types";
import Loader from "@/components/loader/loader";
import getSuitableSize from "@/utils/getSuitableSize";
import getParamClass from "@/utils/getParamClass";

type TProps = {
  mainText: string | undefined;
  secondaryText: string;
  size?: TSize;
  type?: "main" | "secondary" | "mobile";
};

const supportedSizes: TSize[] = ["xs", "xxl", "xxxl"];

export default function InfoCard({ mainText, secondaryText, size = "xxl", type = "main" }: TProps) {
  const sizeClass = getParamClass("size", getSuitableSize({ size, supportedSizes }));
  const typeClass = getParamClass("type", type);

  const fontSizeClass = mainText?.length && mainText?.length >= 12 ? styles.small : "";

  const loaderSideLength = type === "main" ? 40 : 30;
  const loaderType = type === "secondary" ? "secondary" : "main";

  return (
    <div className={`${styles[sizeClass]} ${styles[typeClass]} ${fontSizeClass}`}>
      <div className={`${styles.mainText} block`}>
        {mainText ?? <Loader width={loaderSideLength} height={loaderSideLength} type={loaderType} />}
        <div className={styles.secondaryText}>{secondaryText}</div>
      </div>
    </div>
  );
}
