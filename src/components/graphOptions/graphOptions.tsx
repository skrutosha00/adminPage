import styles from "./graphOptions.module.css";

type TGraphOptions = {
  title: string;
  options: { [key: string | number]: string };
  clickHandler: (option: string) => void;
  activeOption: string;
};

export default function GraphOptions({ title, options, clickHandler, activeOption }: TGraphOptions) {
  const isLessThanThreeOptions = Object.keys(options).length < 3;

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>{title}</h4>

      <div className={styles.options}>
        {Object.keys(options).map((option) => (
          <div
            className={`${styles.option} ${option === activeOption ? styles.chosen : ""} ${
              isLessThanThreeOptions ? styles.wide : ""
            } block`}
            onClick={() => {
              clickHandler(option);
            }}
            key={option}>
            {options[option]}
          </div>
        ))}
      </div>
    </div>
  );
}
