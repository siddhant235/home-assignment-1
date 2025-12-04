import {useState, useRef, useEffect, memo} from "react";
import {useFilterStore} from "../../store/useFilterStore";
import {filterConfig} from "../../data/filterConfig";
import {formatPrice} from "../../utils/formatters";
import styles from "./PriceRangeFilter.module.css";

export const PriceRangeFilter = memo(() => {
  // Only subscribe to priceRange - use shallow comparison for arrays
  const priceRange = useFilterStore(
    (state) => state.priceRange,
    (a, b) => a[0] === b[0] && a[1] === b[1]
  );
  const priceRangeConfig = useFilterStore((state) => state.priceRangeConfig);
  const updatePriceRange = useFilterStore((state) => state.updatePriceRange);
  const [minValue, setMinValue] = useState(priceRange[0]);
  const [maxValue, setMaxValue] = useState(priceRange[1]);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  const min = priceRangeConfig.min;
  const max = priceRangeConfig.max;

  useEffect(() => {
    setMinValue(priceRange[0]);
    setMaxValue(priceRange[1]);
  }, [priceRange]);

  // Update local state when price range config changes
  useEffect(() => {
    // Ensure current values are within the new range
    const clampedMin = Math.max(
      priceRangeConfig.min,
      Math.min(priceRange[0], priceRangeConfig.max)
    );
    const clampedMax = Math.min(
      priceRangeConfig.max,
      Math.max(priceRange[1], priceRangeConfig.min)
    );
    if (clampedMin !== priceRange[0] || clampedMax !== priceRange[1]) {
      updatePriceRange([clampedMin, clampedMax], true);
    }
  }, [priceRangeConfig, priceRange, updatePriceRange]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
    updatePriceRange([value, maxValue]);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
    updatePriceRange([minValue, value]);
  };

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  return (
    <div
      className={styles.filterGroup}
      role="group"
      aria-labelledby="price-filter-title"
    >
      <h3 id="price-filter-title" className={styles.groupTitle}>
        Price Range
      </h3>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack} aria-hidden="true" />
        <div
          className={styles.sliderRange}
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
          aria-hidden="true"
        />
        <input
          ref={minInputRef}
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
          className={`${styles.slider} ${styles.sliderMin}`}
          style={{zIndex: minValue > max - 100 ? 5 : 3}}
          aria-label="Minimum price"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={minValue}
        />
        <input
          ref={maxInputRef}
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
          className={`${styles.slider} ${styles.sliderMax}`}
          style={{zIndex: 4}}
          aria-label="Maximum price"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={maxValue}
        />
      </div>
      <div className={styles.labels} aria-hidden="true">
        <span className={styles.label}>{formatPrice(min)}</span>
        <span className={styles.label}>{formatPrice(max)}</span>
      </div>
      <div className="sr-only" role="status" aria-live="polite">
        Price range: {formatPrice(minValue)} to {formatPrice(maxValue)}
      </div>
    </div>
  );
});
