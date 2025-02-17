import React from "react";

interface CustomInputProps {
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<CustomInputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${className}`}
    />
  );
};

export default Input;
