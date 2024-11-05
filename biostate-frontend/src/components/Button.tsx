import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: any;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "danger" | "success" | "warning" | "secondary" | "info";
  ariaLabel: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  ariaLabel,
}) => {
  const baseClasses = "mt-4 text-white p-2 rounded";
  const primaryClasses =
    "bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700";
  const dangerClasses =
    "bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-700";
  const successClasses =
    "bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-700";
  const warningClasses =
    "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-500 dark:hover:bg-yellow-700";
  const secondaryClasses =
    "bg-gray-500 hover:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-700";
  const infoClasses =
    "bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-700";

  let variantClasses;
  switch (variant) {
    case "danger":
      variantClasses = dangerClasses;
      break;
    case "success":
      variantClasses = successClasses;
      break;
    case "warning":
      variantClasses = warningClasses;
      break;
    case "secondary":
      variantClasses = secondaryClasses;
      break;
    case "info":
      variantClasses = infoClasses;
      break;
    case "primary":
    default:
      variantClasses = primaryClasses;
      break;
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
