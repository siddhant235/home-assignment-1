import styles from "./FilterSection.module.css";

export const FilterSection = ({ children }) => {
  return (
    <aside className={styles.filterSection} role="complementary" aria-label="Property filters">
      <h2 className={styles.title}>Filter</h2>
      <div className={styles.content} role="group">{children}</div>
    </aside>
  );
};

