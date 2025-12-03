import { FaFilter } from "react-icons/fa";
import styles from "./MobileFilterButton.module.css";

export const MobileFilterButton = ({ onClick, filterCount = 0 }) => {
  return (
    <button className={styles.button} onClick={onClick} aria-label="Open filters">
      <FaFilter className={styles.icon} />
      <span className={styles.text}>Filters</span>
      {filterCount > 0 && (
        <span className={styles.badge}>{filterCount}</span>
      )}
    </button>
  );
};

