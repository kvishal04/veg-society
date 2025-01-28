// CustomParagraph.tsx
import React from "react";

interface CustomParagraphProps {
  children: React.ReactNode;
  className?: string;
}

const CustomParagraph: React.FC<CustomParagraphProps> = ({
  children,
  className = "",
}) => {
  return <p className={`${className}`}>{children}</p>;
};

export default CustomParagraph;