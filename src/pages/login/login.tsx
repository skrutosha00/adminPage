import TelegramLoginButton, { TelegramUser } from "telegram-login-button";

import styles from "./login.module.css";
import i18n from "@/i18n.json";
import treeImage from "@/assets/images/tree.png";
import money1Icon from "@/assets/images/money1.png";
import money2Icon from "@/assets/images/money2.png";
import graphIcon from "@/assets/images/graph.png";
import { useActions } from "@/hooks/useActions";
import { useAppSelector } from "@/hooks/useAppSelector";
import { langSelector } from "@/services/selectors";

const testUserData = {
  id: 431152718,
  first_name: "Сергей Су",
  username: "newtyping",
  photo_url: "https://i.pinimg.com/originals/1a/7f/2e/1a7f2e7e2d1f5e2f2c4c9e4e0d7e3e4d.jpg",
  auth_date: Date.now(),
  hash: "test_hash"
};

const authBot = "TG_BOT_TOKEN_HERE";

export default function Login() {
  const lang = useAppSelector(langSelector());
  const { loginSuccess } = useActions();

  function authHandler(user: TelegramUser) {
    loginSuccess(user);
  }

  function testLoginButtonClickHandler() {
    loginSuccess(testUserData);
  }

  return (
    <div className={`${styles.wrapper} block`}>
      <img src={treeImage} alt="tree" className={styles.tree} />

      <div className={styles.right}>
        <h1 className={styles.title}>{i18n.projectName[lang]}</h1>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>{i18n.welcome[lang]}</h2>

          <div className={`${styles.icons} block`}>
            <img src={money1Icon} alt="icon" />
            <img src={money2Icon} alt="icon" />
            <img src={graphIcon} alt="icon" />
          </div>

          <TelegramLoginButton botName={authBot} dataOnauth={authHandler} usePic={true} className={styles.tgButton} />

          <button className={`${styles.testLoginButton} block`} onClick={testLoginButtonClickHandler}>
            {i18n.testLoginButton[lang]}
          </button>
        </section>
      </div>
    </div>
  );
}
