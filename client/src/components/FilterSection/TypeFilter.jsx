import {useFilterStore} from "../../store/useFilterStore";
import {filterConfig} from "../../data/filterConfig";
import {Checkbox} from "../Checkbox/Checkbox";
import styles from "./TypeFilter.module.css";

export const TypeFilter = () => {
  const selectedTypes = useFilterStore((state) => state.selectedTypes);
  const updatePropertyTypes = useFilterStore(
    (state) => state.updatePropertyTypes
  );

  const handleChange = (typeId) => {
    const isChecked = selectedTypes.has(typeId);
    updatePropertyTypes(typeId, !isChecked);
  };

  return (
    <div className={styles.filterGroup}>
      <h3 className={styles.groupTitle}>Type of Place</h3>
      <div className={styles.options}>
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
};
