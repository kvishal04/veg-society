// Paragraph.tsx
import React from "react";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  text?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className = "",
}) => {
  return <p className={`${className}`}>{children}</p>;
};

export default Paragraph;