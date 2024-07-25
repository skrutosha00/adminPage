import { useEffect, useRef, useState } from "react";

import styles from "./searchBar.module.css";
import i18n from "@/i18n.json";
import searchImage from "@/assets/images/search.svg";
import { useAppSelector } from "@/hooks/useAppSelector";
import useDelayUnmount from "@/hooks/useDelayUnmount";
import { langSelector } from "@/services/selectors";
import SearchUserOptions from "@/components/searchUserOptions/searchUserOptions";

const animationSpeed = 300;

export default function SearchBar() {
  const lang = useAppSelector(langSelector());

  const componentRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isShown = useDelayUnmount(isMounted, animationSpeed);

  useEffect(() => {
    document.addEventListener("click", outsideClickHandler);

    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  useEffect(() => {
    setIsMounted(query.length > 0);
  }, [query]);

  function focusHandler() {
    setIsFocused(true);

    if (query.length > 0) {
      setIsMounted(true);
    }
  }

  function blurHandler() {
    setIsFocused(false);
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function outsideClickHandler(ev: MouseEvent) {
    if (componentRef.current && ev.target instanceof Node && !componentRef.current.contains(ev.target)) {
      setIsMounted(false);
    }
  }

  return (
    <section className={styles.searchCont} ref={componentRef}>
      <div className={`${styles.search} ${isFocused ? styles.focused : ""}`}>
        <img src={searchImage} alt="search icon" />
        <input
          value={query}
          type="text"
          placeholder={i18n.searchUserPlaceholder[lang]}
          className={styles.input}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onChange={changeHandler}
        />
      </div>
      <SearchUserOptions query={query} isMounted={isMounted} isShown={isShown} />
    </section>
  );
}
