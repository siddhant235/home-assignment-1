import styles from "./Checkbox.module.css";

export const Checkbox = ({ checked, onChange, label, id, ariaLabel }) => {
  return (
    <label className={styles.option} htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
        aria-label={ariaLabel || label}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
};

