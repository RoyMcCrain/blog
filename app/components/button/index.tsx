import { forwardRef } from "react";
import * as styles from "./styles.css";
import type { ButtonHTMLAttributes } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  return (
    <button {...props} ref={ref} className={styles.root}>
      {children}
    </button>
  );
});

Button.displayName = "Button";
