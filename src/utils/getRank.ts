import i18n from "@/i18n.json";
import { TLang } from "@/services/types";

type TGetRankProps = {
  rank: number;
  lang: TLang;
};

export default function getRank({ rank, lang }: TGetRankProps): string {
  if (rank < 0 || rank > 5) {
    rank = 0;
  }

  const i18Key = ("rank_" + rank) as keyof typeof i18n;
  return i18n[i18Key][lang];
}
