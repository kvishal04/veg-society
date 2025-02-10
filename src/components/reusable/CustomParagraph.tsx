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
  text=""
}) => {
  return <p className={`${className}`}>{text}</p>;
};

export default Paragraph;