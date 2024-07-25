import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import styles from "./searchUserOptions.module.css";
import i18n from "@/i18n.json";
import useDebounce from "@/hooks/useDebouce";
import Loader from "@/components/loader/loader";
import SearchUserOption from "@/components/searchUserOption/searchUserOption";
import { useAppSelector } from "@/hooks/useAppSelector";
import { langSelector } from "@/services/selectors";
import { useSearchUserQuery } from "@/services/api/main.api";

type TProps = {
  query: string;
  isMounted: boolean;
  isShown: boolean;
};

export default function SearchUserOptions({ query, isMounted, isShown }: TProps) {
  const debouncedQuery = useDebounce(query, 300);
  const { data, isFetching, isError } = useSearchUserQuery(
    { q: debouncedQuery },
    { skip: debouncedQuery.length === 0 }
  );

  const lang = useAppSelector(langSelector());

  const visabilityClass = isMounted ? styles.visible : styles.hidden;

  if (!isShown) {
    return <></>;
  }

  let content: JSX.Element = <></>;

  if (isError) {
    content = <h4 className={styles.errorMessage}>{i18n.noUserFound[lang]}</h4>;
  } else if (isFetching || !data) {
    content = (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  } else if (data) {
    content = (
      <>
        <SimpleBar style={{ maxHeight: "50dvh" }} autoHide={false}>
          {data.map((user) => (
            <SearchUserOption user={user} key={user.id} />
          ))}
        </SimpleBar>
      </>
    );
  }

  return <div className={`${styles.options} ${visabilityClass}`}>{content}</div>;
}
