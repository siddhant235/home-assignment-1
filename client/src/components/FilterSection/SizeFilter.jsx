import {useState, useEffect, memo} from "react";
import {useFilterStore} from "../../store/useFilterStore";
import {filterConfig} from "../../data/filterConfig";
import styles from "./SizeFilter.module.css";

export const SizeFilter = memo(() => {
  // Only subscribe to sizeRange - use shallow comparison for arrays
  const sizeRange = useFilterStore(
    (state) => state.sizeRange,
    (a, b) => a[0] === b[0] && a[1] === b[1]
  );
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
    <div
      className={styles.filterGroup}
      role="group"
      aria-labelledby="size-filter-title"
    >
      <h3 id="size-filter-title" className={styles.groupTitle}>
        Size
      </h3>
      <div className={styles.inputs}>
        <div className={`${styles.inputWrapper} ${error ? styles.error : ""}`}>
          <span className={styles.inputLabel}>Min</span>
          <input
            id="size-min-input"
            type="number"
            className={styles.input}
            value={minSize || ""}
            onChange={handleMinChange}
            min={min}
            max={max}
            aria-label="Minimum square footage"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "size-error" : undefined}
          />
          <span className={styles.inputUnit}>sq ft</span>
        </div>
        <div className={`${styles.inputWrapper} ${error ? styles.error : ""}`}>
          <span className={styles.inputLabel}>Max</span>
          <input
            id="size-max-input"
            type="number"
            className={styles.input}
            value={maxSize || ""}
            onChange={handleMaxChange}
            min={min}
            max={max}
            aria-label="Maximum square footage"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "size-error" : undefined}
          />
          <span className={styles.inputUnit}>sq ft</span>
        </div>
      </div>
      {error && (
        <div
          id="size-error"
          className={styles.error}
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}
    </div>
  );
});
