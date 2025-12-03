import { PropertyCard } from "../PropertyCard/PropertyCard";
import styles from "./PropertyGrid.module.css";

export const PropertyGrid = ({ properties }) => {
  if (properties.length === 0) {
    return null; // Empty state will be handled by parent
  }

  return (
    <div className={styles.grid}>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

