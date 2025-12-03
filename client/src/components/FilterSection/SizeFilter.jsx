import { useState, useEffect } from "react";
import { useFilterStore } from "../../store/useFilterStore";
import { filterConfig } from "../../data/filterConfig";
import styles from "./SizeFilter.module.css";

export const SizeFilter = () => {
  const sizeRange = useFilterStore((state) => state.sizeRange);
  const updateSizeRange = useFilterStore((state) => state.updateSizeRange);
  const [minSize, setMinSize] = useState(sizeRange[0]);
  const [maxSize, setMaxSize] = useState(sizeRange[1]);
  const [error, setError] = useState("");

  const min = filterConfig.sizeRange.min;
  const max = filterConfig.sizeRange.max;

  useEffect(() => {
    setMinSize(sizeRange[0]);
    setMaxSize(sizeRange[1]);
  }, [sizeRange]);

  const validateAndUpdate = (newMin, newMax) => {
    if (newMin > newMax) {
      setError("Min size cannot exceed max size");
      return false;
    }
    setError("");
    updateSizeRange([newMin, newMax]);
    return true;
  };

  const handleMinChange = (e) => {
    const value = Math.max(min, Math.min(Number(e.target.value) || min, max));
    setMinSize(value);
    validateAndUpdate(value, maxSize);
  };

  const handleMaxChange = (e) => {
    const value = Math.min(max, Math.max(Number(e.target.value) || max, min));
    setMaxSize(value);
    validateAndUpdate(minSize, value);
  };

  return (
    <div className={styles.filterGroup}>
      <h3 className={styles.groupTitle}>Size</h3>
      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Min sq ft</label>
          <input
            type="number"
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            value={minSize}
            onChange={handleMinChange}
            min={min}
            max={max}
            placeholder="Min"
            aria-label="Minimum square footage"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Max sq ft</label>
          <input
            type="number"
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            value={maxSize}
            onChange={handleMaxChange}
            min={min}
            max={max}
            placeholder="Max"
            aria-label="Maximum square footage"
          />
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

