// CustomSelect.tsx
import React from "react";

interface CustomSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
}

const Select: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  className = "",
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full p-2 bg-white text-black border border-darkGreen hover:bg-gray-100 focus:ring-black ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;