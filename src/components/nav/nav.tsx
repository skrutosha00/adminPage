import { Link } from "react-router-dom";

import styles from "./nav.module.css";
import i18n from "@/i18n.json";
import settingsIcon from "@/assets/images/settings.svg";
import { useActions } from "@/hooks/useActions";
import { ROUTES } from "@/services/globalVars";
import { langSelector } from "@/services/selectors";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function Nav() {
  const { changeIsOpen } = useActions();
  const lang = useAppSelector(langSelector());

  function settingsIconClickHandler() {
    changeIsOpen(true);
  }

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.links}>
          <Link to={`/${ROUTES.DEFAULT}`}>{i18n.structure[lang]}</Link>
          <Link to={`/${ROUTES.STAT}`}>{i18n.stat[lang]}</Link>
        </div>

        <img
          src={settingsIcon}
          className={styles.settingsIcon}
          alt="settings icon"
          onClick={settingsIconClickHandler}
        />
      </div>
    </header>
  );
}
