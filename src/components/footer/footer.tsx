import styles from "./footer.module.css";
import i18n from "@/i18n.json";
import { useAppSelector } from "@/hooks/useAppSelector";
import { langSelector } from "@/services/selectors";

import logo from "@/assets/images/logo_white.svg";
import tgIcon from "@/assets/images/tg_footer_icon.svg";
import docIcon from "@/assets/images/doc_footer_icon.svg";
import globeIcon from "@/assets/images/globe_footer_icon.svg";
import devIcon from "@/assets/images/dev_footer_icon.svg";

const tgChat = "";
const docs = "";
const officialSite = "";
const devChannel = "";

export default function Footer() {
  const lang = useAppSelector(langSelector());

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h1>{i18n.projectName[lang]}</h1>
        </div>

        <div className={styles.line}></div>

        <div className={styles.links}>
          <a href={tgChat} className={styles.link}>
            <img src={tgIcon} alt="telegram" />
            {i18n.tgChat[lang]}
          </a>
          <a href={docs} className={styles.link}>
            <img src={docIcon} alt="instructions" />
            {i18n.instructions[lang]}
          </a>
          <a href={officialSite} className={styles.link}>
            <img src={globeIcon} alt="website" />
            {i18n.officialSite[lang]}
          </a>
          <a href={devChannel} className={styles.link}>
            <img src={devIcon} alt="developers" />
            {i18n.devChannel[lang]}
          </a>
        </div>
        <div className={styles.copyright}>&copy; 2024</div>
      </div>
    </footer>
  );
}
