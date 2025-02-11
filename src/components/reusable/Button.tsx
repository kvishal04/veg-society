import React from "react";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "dark-green" | "light-green" | "white";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string; // Allow additional custom classes
}

const Button: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  fullWidth = false,
  className = "", // Default to an empty string
}) => {
  const baseStyles = `rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition`;
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    outline: "bg-transparent border border-gray-500 text-gray-500 hover:bg-gray-100 focus:ring-gray-500",
    "dark-green": "bg-green-900 text-white border border-lightGreen hover:bg-green-800 focus:ring-green-900",
    "light-green": "bg-green-200 text-white border border-green-400 hover:bg-green-300 focus:ring-green-200",
    white: "bg-white text-black border border-black hover:bg-gray-100 focus:ring-black",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${
        fullWidth ? "w-full" : ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
