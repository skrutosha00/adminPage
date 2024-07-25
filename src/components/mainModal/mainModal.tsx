import { useParams } from "react-router-dom";

import styles from "./mainModal.module.css";
import i18n from "@/i18n.json";
import { useActions } from "@/hooks/useActions";
import { useAppSelector } from "@/hooks/useAppSelector";
import useScreenSize from "@/hooks/useScreenSize";
import { historySelector, langSelector, structureFilterSelector } from "@/services/selectors";
import { useGetUserDBInfoQuery } from "@/services/api/main.api";
import Modal from "@/components/modal/modal";
import Profile from "@/components/profile/profile";
import InfoCard from "@/components/infoCard/infoCard";
import Loader from "@/components/loader/loader";
import UserCard from "@/components/userCard/userCard";
import formatNumber from "@/utils/formatNumber";
import { TSize } from "@/services/types";
import getSuitableSize from "@/utils/getSuitableSize";
import { filterFirstLine, sortFirstLine } from "@/utils/firstLineFunctions";

const supportedSizes: TSize[] = ["s", "m"];

export default function MainModal() {
  const history = useAppSelector(historySelector());
  const lang = useAppSelector(langSelector());
  const srtuctureFilter = useAppSelector(structureFilterSelector());

  const { clearHistory, removeLastFromHistory } = useActions();

  const { multiplier } = useParams() as { multiplier: string };
  const { data: userDBInfo, isFetching } = useGetUserDBInfoQuery(
    { id: history[history.length - 1], multiplier: +multiplier.replace("x", "") },
    {
      skip: !history.length
    }
  );
  const size = useScreenSize();
  const isMobile = getSuitableSize({ size, supportedSizes }) === "s";

  const profileType = isMobile ? "mobile" : "secondary";
  const infoCardType = isMobile ? "mobile" : "secondary";
  const userCardType = isMobile ? "secondary" : "main";
  const userCardSize = isMobile ? "m" : "s";

  const isMounted = !!history.length;
  const hasUpdatedInfo = !!userDBInfo && !isFetching;
  const activeCount = userDBInfo?.first_line.filter((user) => user.rank > 0).length ?? 0;

  const cardMainTexts = [
    hasUpdatedInfo ? `${activeCount}🎲 / ${userDBInfo.first_line_count - activeCount}😴` : undefined,
    hasUpdatedInfo ? formatNumber(userDBInfo.structure_count.toString(), " ") : undefined,
    hasUpdatedInfo ? formatNumber(userDBInfo.ref_bonuses_count.toString(), " ") : undefined
  ];

  return (
    <Modal isMounted={isMounted} close={clearHistory} backClickHandler={removeLastFromHistory}>
      <section className={`${styles.header} block`}>
        <div className={`${styles.cards} block`}>
          <InfoCard
            mainText={cardMainTexts[0]}
            secondaryText={i18n.first_line_count[lang]}
            size={size}
            type={infoCardType}
          />
          <InfoCard
            mainText={cardMainTexts[1]}
            secondaryText={i18n.structure_count[lang]}
            size={size}
            type={infoCardType}
          />
          <InfoCard
            mainText={cardMainTexts[2]}
            secondaryText={i18n.ref_bonuses_count[lang]}
            size={size}
            type={infoCardType}
          />
        </div>

        <div className={`${styles.profile} block`}>
          <Profile userDBInfo={isFetching ? undefined : userDBInfo} type={profileType} />
        </div>
      </section>

      {hasUpdatedInfo ? (
        <section className={`${styles.firstLine}`}>
          {[...userDBInfo.first_line]
            .filter((firstLineUser) => filterFirstLine(firstLineUser, srtuctureFilter))
            .sort(sortFirstLine)
            .map((firstLineUser) => (
              <UserCard user={firstLineUser} type={userCardType} size={userCardSize} key={firstLineUser.id} />
            ))}
        </section>
      ) : (
        <div className={styles.loader}>
          <Loader width={50} height={50} type={isMobile ? "main" : "secondary"} />
        </div>
      )}
    </Modal>
  );
}
