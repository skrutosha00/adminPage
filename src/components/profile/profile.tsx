import parse from "html-react-parser";

import styles from "./profile.module.css";
import { useAppSelector } from "@/hooks/useAppSelector";
import { langSelector } from "@/services/selectors";
import getRank from "@/utils/getRank";
import TextLoader from "@/components/textLoader/textLoader";
import getParamClass from "@/utils/getParamClass";
import { useGetUserPhotoQuery } from "@/services/api/main.api";
import getDefaultAvatar from "@/utils/getDefaultAvatar";

type TProps = {
  userDBInfo?: TUserDBInfo;
  type?: "main" | "secondary" | "mobile";
};

export default function Profile({ userDBInfo, type = "main" }: TProps) {
  const lang = useAppSelector(langSelector());

  const rankText = userDBInfo?.rank !== undefined ? getRank({ rank: userDBInfo?.rank, lang }) : undefined;
  const typeClass = getParamClass("type", type);
  const loaderWidth = type === "main" ? 170 : 145;

  const { currentData: photoLink } = useGetUserPhotoQuery(
    { id: userDBInfo?.id as number },
    {
      skip: !userDBInfo?.id
    }
  );
  const photoUrl = !!userDBInfo && photoLink ? photoLink : getDefaultAvatar(userDBInfo?.id || 0);

  function TextElem(text: string | undefined, extraClass?: string) {
    return text ? <div className={extraClass}>{parse(text)}</div> : <TextLoader width={loaderWidth} height={20} />;
  }

  return (
    <section className={`${styles.profile} ${styles[typeClass]} block`}>
      <div className={`${styles.avatar} block`}>
        <img src={photoUrl} alt="user avatar" />
      </div>
      <div className={styles.info}>
        {TextElem(userDBInfo ? `${userDBInfo.first_name} ${userDBInfo.last_name}` : undefined)}
        {TextElem(rankText, styles.rank)}
      </div>
    </section>
  );
}
