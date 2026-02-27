import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}) => {
  const baseStyles = `
    font-semibold rounded-lg focus:outline-none
    focus:ring-2 focus:ring-offset-2 focus:ring-opacity-75
    transition-all duration-150 ease-in-out
    border
    disabled:opacity-60 disabled:cursor-not-allowed
  `;

  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles = `
        bg-blue-600 text-white border-blue-600
        hover:bg-blue-700 hover:border-blue-700
        focus:ring-blue-500
        disabled:hover:bg-blue-600 disabled:hover:border-blue-600
      `;
      break;
    case "secondary":
      variantStyles = `
        bg-gray-600 text-white border-gray-600
        hover:bg-gray-700 hover:border-gray-700
        focus:ring-gray-500
        disabled:hover:bg-gray-600 disabled:hover:border-gray-600
      `;
      break;
    case "danger":
      variantStyles = `
        bg-red-600 text-white border-red-600
        hover:bg-red-700 hover:border-red-700
        focus:ring-red-500
        disabled:hover:bg-red-600 disabled:hover:border-red-600
      `;
      break;
    case "outline":
      variantStyles = `
        bg-transparent text-blue-600 border-blue-600
        hover:bg-blue-600 hover:text-white
        focus:ring-blue-500
        disabled:hover:bg-transparent disabled:hover:text-blue-600 disabled:text-blue-600/60 disabled:border-blue-600/60
      `;
      break;
    default:
      variantStyles = `
        bg-blue-600 text-white border-blue-600
        hover:bg-blue-700 hover:border-blue-700
        focus:ring-blue-500
      `;
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case "sm":
      sizeStyles = "px-3 py-1.5 text-sm";
      break;
    case "md":
      sizeStyles = "px-4 py-2 text-base";
      break;
    case "lg":
      sizeStyles = "px-6 py-3 text-lg";
      break;
    default:
      sizeStyles = "px-4 py-2 text-base";
      break;
  }

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles}
    ${sizeStyles}
    ${className}
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <button
      type="button"
      className={combinedClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
