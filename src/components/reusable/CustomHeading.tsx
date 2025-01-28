// CustomHeading.tsx
import React, { JSX } from "react";

interface CustomHeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const CustomHeading: React.FC<CustomHeadingProps> = ({
  level = 1,
  children,
  className = "",
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return <Tag className={`font-bold ${className}`}>{children}</Tag>;
};

export default CustomHeading;
