import React, { useState, useRef, useEffect } from "react";
import { Triangle } from "lucide-react";

interface CustomSelectProps {
  id: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  optionClassName?: string;
}

const Select: React.FC<CustomSelectProps> = ({
  id,
  options,
  value,
  onChange,
  disabled = false,
  className = "",
  optionClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className={`relative w-full ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>

      {/* Select Box */}
      <button
        id={id}
        className={`text-left flex justify-between items-center ${className}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="w-full">{options.find((opt) => opt.value === value)?.label || "Select an option"}</div>
        <Triangle
          strokeWidth={1.75}
          fill="black"
          size={12}
          className={`transition-transform ${isOpen ? "rotate-0" : "rotate-180"}`}
        />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-darkGreen rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              className={`p-2 text-left block w-full text-darkGreen cursor-pointer ${optionClassName}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

export default Select;
