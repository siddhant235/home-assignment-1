import {memo, useMemo} from "react";
import {PropertyCard} from "../PropertyCard/PropertyCard";
import {PropertyCardSkeleton} from "../PropertyCardSkeleton/PropertyCardSkeleton";
import styles from "./PropertyGrid.module.css";

export const PropertyGrid = memo(
  ({properties, isLoading = false, skeletonCount = 6}) => {
    // Memoize skeleton array to prevent recreation on every render
    const skeletonArray = useMemo(
      () => Array.from({length: skeletonCount}),
      [skeletonCount]
    );

    if (isLoading) {
      return (
        <div
          className={styles.grid}
          role="status"
          aria-label="Loading properties"
        >
          {skeletonArray.map((_, index) => (
            <div key={`skeleton-${index}`} className={styles.gridItem}>
              <PropertyCardSkeleton />
            </div>
          ))}
        </div>
      );
    }

    if (properties.length === 0) {
      return null; // Empty state will be handled by parent
    }

    return (
      <div className={styles.grid} role="list" aria-label="Property listings">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className={styles.gridItem}
            style={{animationDelay: `${index * 0.05}s`}}
            role="listitem"
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    );
  }
);
