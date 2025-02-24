// CustomTextarea.tsx
import React from "react";

interface CustomTextareaProps {
  id: string
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const Textarea: React.FC<CustomTextareaProps> = ({
  id,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
}) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    />
  );
};

export default Textarea;
