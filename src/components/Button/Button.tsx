import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${styles.button} ${styles[variant]} ${
        loading ? styles.loading : ""
      }`}
    >
      {loading ? (
        <span className={styles.spinner}>
          <span className={styles.spinnerIcon}></span>
          در حال پردازش...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
