import { TelegramUser } from "telegram-login-button";

import styles from "./firstLine.module.css";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useGetUserDBInfoQuery } from "@/services/api/main.api";
import { structureFilterSelector, userSelector } from "@/services/selectors";
import UserCard from "@/components/userCard/userCard";
import Loader from "@/components/loader/loader";
import { TSize } from "@/services/types";
import getParamClass from "@/utils/getParamClass";
import getSuitableSize from "@/utils/getSuitableSize";
import useScreenSize from "@/hooks/useScreenSize";
import { useParams } from "react-router-dom";
import { filterFirstLine, sortFirstLine } from "@/utils/firstLineFunctions";

const supportedSizes: TSize[] = ["l", "xl"];

export default function FirstLine() {
  const { id } = useAppSelector(userSelector()) as TelegramUser;
  const srtuctureFilter = useAppSelector(structureFilterSelector());
  const { multiplier } = useParams() as { multiplier: string };
  const { currentData: userDBInfo } = useGetUserDBInfoQuery({
    id,
    multiplier: +multiplier.replace("x", "")
  });

  const size = useScreenSize();
  const sizeClass = getParamClass("size", getSuitableSize({ size, supportedSizes }));

  if (!userDBInfo?.first_line) {
    return (
      <div className={styles.loader}>
        <Loader width={50} height={50} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <section className={`${styles.firstLine} ${styles[sizeClass]}`}>
        {[...userDBInfo.first_line]
          .filter((firstLineUser) => filterFirstLine(firstLineUser, srtuctureFilter))
          .sort(sortFirstLine)
          .map((firstLineUser) => (
            <UserCard user={firstLineUser} type="main" size="m" key={firstLineUser.id} />
          ))}
      </section>
    </div>
  );
}
