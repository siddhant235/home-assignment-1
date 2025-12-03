import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { FilterSection } from "../FilterSection/FilterSection";
import { TypeFilter } from "../FilterSection/TypeFilter";
import { PriceRangeFilter } from "../FilterSection/PriceRangeFilter";
import { SizeFilter } from "../FilterSection/SizeFilter";
import { FeaturesFilter } from "../FilterSection/FeaturesFilter";
import styles from "./MobileFilterDrawer.module.css";

export const MobileFilterDrawer = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Filter</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close filters"
          >
            <FaTimes />
          </button>
        </div>
        <div className={styles.content}>
          <FilterSection>
            <TypeFilter />
            <PriceRangeFilter />
            <SizeFilter />
            <FeaturesFilter />
          </FilterSection>
        </div>
      </div>
    </>
  );
};

