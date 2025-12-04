import {memo} from "react";
import styles from "./Checkbox.module.css";

export const Checkbox = memo(
  ({checked, onChange, label, id, ariaLabel}) => {
    const handleKeyDown = (e) => {
      // Allow Enter and Space to toggle checkbox
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onChange();
      }
    };

    return (
      <label className={styles.option} htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className={styles.checkbox}
          aria-label={ariaLabel || label}
          role="checkbox"
          aria-checked={checked}
        />
        <span className={styles.label}>{label}</span>
      </label>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if checked state or onChange changes
    return (
      prevProps.checked === nextProps.checked &&
      prevProps.onChange === nextProps.onChange &&
      prevProps.label === nextProps.label &&
      prevProps.id === nextProps.id &&
      prevProps.ariaLabel === nextProps.ariaLabel
    );
  }
);
