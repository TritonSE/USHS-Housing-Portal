import React from "react";

import styles from "./Button.module.css";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface ButtonProps extends React.ComponentProps<"button"> {
  label: string;
  kind?: "primary" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { label, kind = "primary", className, ...props },
  ref,
) {
  let buttonClass = styles.button;
  switch (kind) {
    case "primary":
      buttonClass += ` ${styles.primary}`;
      break;
    case "secondary":
      buttonClass += ` ${styles.secondary}`;
      break;
  }
  if (className) {
    buttonClass += ` ${className}`;
  }
  return (
    <button ref={ref} className={buttonClass} {...props}>
      {label}
    </button>
  );
});
