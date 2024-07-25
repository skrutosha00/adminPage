import parse from "html-react-parser";
import { useRef, useState } from "react";

import i18n from "@/i18n.json";
import styles from "./userCard.module.css";
import { useAppSelector } from "@/hooks/useAppSelector";
import { langSelector } from "@/services/selectors";
import getRank from "@/utils/getRank";
import getParamClass from "@/utils/getParamClass";
import { useActions } from "@/hooks/useActions";
import { useGetUserPhotoQuery } from "@/services/api/main.api";
import useIntersectObserver from "@/hooks/useIntersectObserver";
import getDefaultAvatar from "@/utils/getDefaultAvatar";

type TCardType = "main" | "secondary";
type TCardSize = "s" | "m";

type TProps = {
  user: TFirstLineUser;
  type?: TCardType;
  size?: TCardSize;
};

export default function UserCard({ user, type = "main", size = "m" }: TProps) {
  const lang = useAppSelector(langSelector());
  const { addToHistory } = useActions();
  const [isIntersecting, setIsIntersecting] = useState(false);

  const sizeClass = styles[getParamClass("size", size)];
  const typeClass = styles[getParamClass("type", type)];

  const photoBytes = useGetUserPhotoQuery({ id: user.id }, { skip: !isIntersecting }).currentData;
  const photoUrl = photoBytes ? `data:image/png;base64,${photoBytes}` : getDefaultAvatar(user.id);
  const userLink = user.username ? `http://t.me/${user.username}` : `tg://user?id=${user.id}`;

  const cardRef = useRef<HTMLDivElement>(null);
  useIntersectObserver<HTMLDivElement>(cardRef, intersectionHandler);

  function cardClickHandler() {
    addToHistory(user.id);
  }

  function linkClickHandler(e: React.MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation();
  }

  function intersectionHandler() {
    setIsIntersecting(true);
  }

  return (
    <div>
      <div className={`${styles.card} ${typeClass} ${sizeClass}`} ref={cardRef} onClick={cardClickHandler}>
        <img src={photoUrl} alt="user avatar" className={styles.avatar} />

        <div className={`${styles.name} bold`}>
          {user.first_name} {user.last_name}
        </div>

        <div className={styles.fields}>
          <a href={userLink} className={styles.tgLink} onClick={linkClickHandler}>
            @{user.username ?? "user"}
          </a>
          <div className={styles.rank}>{parse(getRank({ rank: user.rank, lang }))}</div>
          <div>
            {i18n.card_field_first_line[lang]}: {user.first_line_count}
          </div>
          <div>
            {i18n.card_field_structure[lang]}: {user.structure_count}
          </div>
        </div>
      </div>
    </div>
  );
}
