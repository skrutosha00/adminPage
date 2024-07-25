import { useParams } from "react-router-dom";
import { TelegramUser } from "telegram-login-button";

import i18n from "@/i18n.json";
import styles from "./header.module.css";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useGetUserDBInfoQuery } from "@/services/api/main.api";
import { langSelector, userSelector } from "@/services/selectors";
import Profile from "@/components/profile/profile";
import InfoCard from "@/components/infoCard/infoCard";
import formatNumber from "@/utils/formatNumber";

export default function Header() {
  const { id } = useAppSelector(userSelector()) as TelegramUser;
  const lang = useAppSelector(langSelector());
  const { multiplier } = useParams() as { multiplier: string };
  const { currentData: userDBInfo } = useGetUserDBInfoQuery({
    id,
    multiplier: +multiplier.replace("x", "")
  });

  const activeCount = userDBInfo?.first_line.filter((user) => user.rank > 0).length ?? 0;

  const cardMainTexts = [
    userDBInfo ? `${activeCount}🎲 / ${userDBInfo.first_line_count - activeCount}😴` : undefined,
    userDBInfo ? formatNumber(userDBInfo.structure_count.toString(), " ") : undefined,
    userDBInfo ? formatNumber(userDBInfo.ref_bonuses_count.toString(), " ") : undefined
  ];

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.cards} block`}>
        <InfoCard mainText={cardMainTexts[0]} secondaryText={i18n.first_line_count[lang]} />
        <InfoCard mainText={cardMainTexts[1]} secondaryText={i18n.structure_count[lang]} />
        <InfoCard mainText={cardMainTexts[2]} secondaryText={i18n.ref_bonuses_count[lang]} />
      </div>
      <Profile userDBInfo={userDBInfo} />
    </header>
  );
}
