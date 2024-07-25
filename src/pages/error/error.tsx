import { useEffect } from "react";

import styles from "./error.module.css";
import i18n from "@/i18n.json";
import errorPic from "@/assets/images/error.svg";
import { useAppSelector } from "@/hooks/useAppSelector";
import { langSelector } from "@/services/selectors";
import { Link } from "react-router-dom";

export default function Error() {
  const lang = useAppSelector(langSelector());

  useEffect(() => {
    document.body.style.background = "#e3ebf7";

    return () => {
      document.body.style.background = "unset";
    };
  }, []);

  return (
    <div className={`${styles.wrapper} wrapper block`}>
      <section className={styles.text}>
        <h1 className={styles.header}>{i18n.errorHeader[lang]}</h1>
        <p className={styles.subheader}>{i18n.errorText[lang]}</p>
        <Link to="/" className={styles.link}>
          {i18n.errorLink[lang]}
        </Link>
      </section>
      <img src={errorPic} alt="error" />
    </div>
  );
}
