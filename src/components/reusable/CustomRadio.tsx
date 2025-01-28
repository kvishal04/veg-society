// CustomRadio.tsx
import React from "react";

interface CustomRadioProps {
  name: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  name,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            className="focus:ring-blue-500"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CustomRadio;
