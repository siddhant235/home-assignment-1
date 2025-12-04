import { memo } from "react";
import styles from "./PropertyCardSkeleton.module.css";

export const PropertyCardSkeleton = memo(() => {
  return (
    <div className={styles.skeleton} role="status" aria-label="Loading property">
      <div className={styles.imageSkeleton} />
      <div className={styles.contentSkeleton}>
        <div className={styles.titleSkeleton} />
        <div className={styles.locationSkeleton} />
        <div className={styles.priceSkeleton} />
      </div>
    </div>
  );
});

