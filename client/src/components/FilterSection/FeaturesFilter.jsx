import { useFilterStore } from "../../store/useFilterStore";
import { filterConfig } from "../../data/filterConfig";
import { Checkbox } from "../Checkbox/Checkbox";
import styles from "./FeaturesFilter.module.css";

export const FeaturesFilter = () => {
  const selectedFeatures = useFilterStore((state) => state.selectedFeatures);
  const updateFeatures = useFilterStore((state) => state.updateFeatures);

  const handleChange = (feature) => {
    const isChecked = selectedFeatures.has(feature);
    updateFeatures(feature, !isChecked);
  };

  return (
    <div className={styles.filterGroup}>
      <h3 className={styles.groupTitle}>Features</h3>
      <div className={styles.options}>
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
};

