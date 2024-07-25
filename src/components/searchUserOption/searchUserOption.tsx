import styles from "./searchUserOption.module.css";
import { useActions } from "@/hooks/useActions";
import { useGetUserPhotoQuery } from "@/services/api/main.api";
import getDefaultAvatar from "@/utils/getDefaultAvatar";

export default function SearchOption({ user }: { user: TSearchUser }) {
  const { addToHistory } = useActions();

  const photoBytes = useGetUserPhotoQuery({ id: user.id }).data;
  const photoUrl = photoBytes ? `data:image/png;base64,${photoBytes}` : getDefaultAvatar(user.id);

  function clickHandler() {
    addToHistory(user.id);
  }

  return (
    <div className={`${styles.option} block`} onClick={clickHandler}>
      <div className={styles.username}>{user.username ? `@${user.username}` : " "}</div>
      <div className={styles.name}>
        {user.first_name} {user.last_name}
      </div>
      <div className={styles.avatar}>
        <img src={photoUrl} alt="avatar" />
      </div>
    </div>
  );
}
