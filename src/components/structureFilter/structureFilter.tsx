import styles from "./structureFilter.module.css";
import i18n from "@/i18n.json";
import { useAppSelector } from "@/hooks/useAppSelector";
import { langSelector, structureFilterSelector } from "@/services/selectors";
import { TStructureFilter } from "@/services/types";
import { useActions } from "@/hooks/useActions";

const options: TStructureFilter[] = ["all", "active", "inactive"];

export default function StructureFilter() {
  const lang = useAppSelector(langSelector());
  const structureFilter = useAppSelector(structureFilterSelector());
  const { changeStructureFilter } = useActions();

  const clickHandler = (option: TStructureFilter) => {
    changeStructureFilter(option);
  };

  return (
    <section className={styles.filter}>
      {options.map((option) => (
        <div
          className={`${styles.option} ${structureFilter === option ? styles.chosen : ""} block`}
          onClick={() => clickHandler(option)}
          key={option}>
          {i18n[option][lang]}
        </div>
      ))}
    </section>
  );
}
