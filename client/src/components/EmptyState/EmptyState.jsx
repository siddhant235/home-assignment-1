import { useFilterStore } from "../../store/useFilterStore";
import styles from "./EmptyState.module.css";

export const EmptyState = () => {
  const clearFilters = useFilterStore((state) => state.clearFilters);

  return (
    <div className={styles.emptyState}>
      <div className={styles.content}>
        <h2 className={styles.title}>No properties found</h2>
        <p className={styles.message}>
          Try adjusting your filters to see more results.
        </p>
        <button className={styles.clearButton} onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

