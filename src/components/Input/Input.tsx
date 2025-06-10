import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  name?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched = false,
  required = false,
  disabled = false,
  autoComplete,
}) => {
  const showError = error && touched;

  return (
    <div className={styles.inputContainer}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`${styles.input} ${showError ? styles.error : ""}`}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {showError && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
