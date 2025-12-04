import { FaFilter } from "react-icons/fa";
import styles from "./MobileFilterButton.module.css";

export const MobileFilterButton = ({ onClick, filterCount = 0, isOpen = false }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button 
      className={styles.button} 
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={filterCount > 0 ? `Open filters (${filterCount} active)` : "Open filters"}
      aria-expanded={isOpen}
    >
      <FaFilter className={styles.icon} aria-hidden="true" />
      <span className={styles.text}>Filters</span>
      {filterCount > 0 && (
        <span className={styles.badge} aria-label={`${filterCount} active filters`}>
          {filterCount}
        </span>
      )}
    </button>
  );
};

