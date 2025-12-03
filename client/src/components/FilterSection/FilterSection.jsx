import styles from "./FilterSection.module.css";

export const FilterSection = ({ children }) => {
  return (
    <div className={styles.filterSection}>
      <h2 className={styles.title}>Filter</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

