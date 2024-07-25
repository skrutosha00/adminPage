import { Link, useParams } from "react-router-dom";

import styles from "./multiplierOptions.module.css";
import { BOT_NAMES } from "@/services/globalVars";

export default function MultiplierOptions() {
  const { multiplier } = useParams();

  return (
    <section className={`${styles.options}`}>
      {BOT_NAMES.map((globalMultiplier) => (
        <Link
          to={`/${globalMultiplier}`}
          className={`${styles.option} ${globalMultiplier === multiplier ? styles.chosen : ""} block`}
          key={globalMultiplier}>
          {globalMultiplier}
        </Link>
      ))}
    </section>
  );
}
