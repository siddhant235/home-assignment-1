import {useCallback, memo} from "react";
import {useFilterStore} from "../../store/useFilterStore";
import {filterConfig} from "../../data/filterConfig";
import {Checkbox} from "../Checkbox/Checkbox";
import styles from "./FeaturesFilter.module.css";

export const FeaturesFilter = memo(() => {
  // Only subscribe to selectedFeatures - use shallow comparison
  const selectedFeatures = useFilterStore(
    (state) => state.selectedFeatures,
    (a, b) => {
      // Custom equality check for Sets
      if (a.size !== b.size) return false;
      for (const item of a) {
        if (!b.has(item)) return false;
      }
      return true;
    }
  );
  const updateFeatures = useFilterStore((state) => state.updateFeatures);

  const handleChange = useCallback(
    (feature) => {
      const isChecked = selectedFeatures.has(feature);
      updateFeatures(feature, !isChecked);
    },
    [selectedFeatures, updateFeatures]
  );

  return (
    <div
      className={styles.filterGroup}
      role="group"
      aria-labelledby="features-filter-title"
    >
      <h3 id="features-filter-title" className={styles.groupTitle}>
        Features
      </h3>
      <div className={styles.options} role="group">
        {filterConfig.features.map((feature) => {
          const isChecked = selectedFeatures.has(feature);
          return (
            <Checkbox
              key={feature}
              id={`feature-${feature}`}
              checked={isChecked}
              onChange={() => handleChange(feature)}
              label={feature}
              ariaLabel={`Filter by ${feature}`}
            />
          );
        })}
      </div>
    </div>
  );
});
