import React from "react";
import { Triangle } from "lucide-react";

interface CustomSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
  optionClassName?: string;
}

const Select: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  className = "",
  optionClassName = ""
}) => {
  return (
    <div className=" w-full">
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={` ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${className}`}
        >
          {options.map((option) => (
            <option className={optionClassName} key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Icon */}
        <Triangle
          strokeWidth={1.75}
          fill="black"
          size={12}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rotate-180"
        />
      </div>
    
    </div>
  );
};

export default Select;
