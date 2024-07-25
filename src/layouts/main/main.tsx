import { ReactNode } from "react";

import styles from "./main.module.css";
import Nav from "@/components/nav/nav";
import SettingsSidebar from "@/components/settingsSidebar/settingsSidebar";
import Footer from "@/components/footer/footer";
import useBodyBackground from "@/hooks/useBodyBackground";
import useBlockScroll from "@/hooks/useBlockScroll";

type TMainProps = {
  children: ReactNode;
};

export default function Main({ children }: TMainProps) {
  useBlockScroll();
  useBodyBackground();

  return (
    <div className={`${styles.wrapper} wrapper`}>
      <Nav />
      <SettingsSidebar />

      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
