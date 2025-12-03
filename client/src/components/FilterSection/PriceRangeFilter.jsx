import {useState, useRef, useEffect} from "react";
import {useFilterStore} from "../../store/useFilterStore";
import {filterConfig} from "../../data/filterConfig";
import {formatPrice} from "../../utils/formatters";
import styles from "./PriceRangeFilter.module.css";

export const PriceRangeFilter = () => {
  const priceRange = useFilterStore((state) => state.priceRange);
  const updatePriceRange = useFilterStore((state) => state.updatePriceRange);
  const [minValue, setMinValue] = useState(priceRange[0]);
  const [maxValue, setMaxValue] = useState(priceRange[1]);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  const min = filterConfig.priceRange.min;
  const max = filterConfig.priceRange.max;

  useEffect(() => {
    setMinValue(priceRange[0]);
    setMaxValue(priceRange[1]);
  }, [priceRange]);

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
    <div className={styles.filterGroup}>
      <h3 className={styles.groupTitle}>Price Range</h3>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrack} />
        <div
          className={styles.sliderRange}
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
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
        />
      </div>
      <div className={styles.labels}>
        <span className={styles.label}>{formatPrice(min)}</span>
        <span className={styles.label}>{formatPrice(max)}</span>
      </div>
    </div>
  );
};
