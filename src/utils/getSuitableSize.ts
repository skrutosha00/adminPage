import { TSize } from "@/services/types";

type TProps = {
  size?: TSize;
  supportedSizes?: TSize[];
};

const sizes: TSize[] = ["xxs", "xs", "s", "m", "l", "xl", "xxl", "xxxl"];

export default function getSuitableSize({ size = "xxxl", supportedSizes = ["xxxl"] }: TProps): TSize {
  for (let i = supportedSizes.length - 1; i >= 0; i--) {
    const supportedSizeElem = supportedSizes[i];
    if (sizes.indexOf(supportedSizeElem) <= sizes.indexOf(size)) {
      return supportedSizeElem;
    }
  }

  return supportedSizes[0];
}
