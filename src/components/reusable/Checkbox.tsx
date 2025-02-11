// CustomCheckbox.tsx
import React from "react";

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
}) => {
  return (
    <label className={`flex items-center gap-2 ${disabled ? "opacity-50" : ""} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="focus:ring-blue-500"
      />
      {label}
    </label>
  );
};


export default CustomCheckbox;