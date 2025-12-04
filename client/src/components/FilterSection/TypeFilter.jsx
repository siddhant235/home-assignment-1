import {useCallback, memo} from "react";
import {useFilterStore} from "../../store/useFilterStore";
import {filterConfig} from "../../data/filterConfig";
import {Checkbox} from "../Checkbox/Checkbox";
import styles from "./TypeFilter.module.css";

export const TypeFilter = memo(() => {
  // Only subscribe to selectedTypes - use shallow comparison
  const selectedTypes = useFilterStore(
    (state) => state.selectedTypes,
    (a, b) => {
      // Custom equality check for Sets
      if (a.size !== b.size) return false;
      for (const item of a) {
        if (!b.has(item)) return false;
      }
      return true;
    }
  );
  const updatePropertyTypes = useFilterStore(
    (state) => state.updatePropertyTypes
  );

  const handleChange = useCallback(
    (typeId) => {
      const isChecked = selectedTypes.has(typeId);
      updatePropertyTypes(typeId, !isChecked);
    },
    [selectedTypes, updatePropertyTypes]
  );

  return (
    <div
      className={styles.filterGroup}
      role="group"
      aria-labelledby="type-filter-title"
    >
      <h3 id="type-filter-title" className={styles.groupTitle}>
        Type of Place
      </h3>
      <div className={styles.options} role="group">
        {filterConfig.propertyTypes.map((type) => {
          const isChecked = selectedTypes.has(type.id);
          return (
            <Checkbox
              key={type.id}
              id={`type-${type.id}`}
              checked={isChecked}
              onChange={() => handleChange(type.id)}
              label={type.label}
              ariaLabel={`Filter by ${type.label}`}
            />
          );
        })}
      </div>
    </div>
  );
});
