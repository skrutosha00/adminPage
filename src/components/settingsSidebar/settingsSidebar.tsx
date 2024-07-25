import styles from "./settingsSidebar.module.css";
import i18n from "@/i18n.json";
import ru from "@/assets/images/ru.svg";
import en from "@/assets/images/en.svg";
import es from "@/assets/images/es.svg";
import { TLang } from "@/services/types";
import { LANGUAGES } from "@/services/globalVars";
import { useActions } from "@/hooks/useActions";
import { useAppSelector } from "@/hooks/useAppSelector";
import { langSelector, settingsSelector } from "@/services/selectors";
import Sidebar from "@/components/sidebar/sidebar";

const languageIcons = {
  ru,
  en,
  es
};

export default function SettingsSidebar() {
  const { isOpen } = useAppSelector(settingsSelector());
  const lang = useAppSelector(langSelector());
  const { changeIsOpen, changeLang } = useActions();
  const { logoutSuccess } = useActions();

  function closeSidebar() {
    changeIsOpen(false);
  }

  function languageBlockClickHandler(language: TLang) {
    changeLang(language);
  }

  function logoutClickHandler() {
    logoutSuccess();
  }

  return (
    <Sidebar isMounted={isOpen} close={closeSidebar}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{i18n.language[lang]}</h2>
        <div className={styles.languageChoice}>
          {LANGUAGES.map((language) => (
            <div className={styles.languageBlock} onClick={() => languageBlockClickHandler(language)} key={language}>
              <div className={`${styles.language} ${language === lang ? styles.chosen : ""} block`}>
                <img src={languageIcons[language]} alt="language icon" />
              </div>
              <div className={styles.languageName}>{i18n[language][lang]}</div>
            </div>
          ))}
        </div>

        <button className={`${styles.logout} block`} onClick={logoutClickHandler}>
          {i18n.logout[lang]}
        </button>
      </div>
    </Sidebar>
  );
}
