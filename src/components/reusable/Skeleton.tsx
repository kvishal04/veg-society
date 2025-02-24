// CustomTextarea.tsx
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface SkeletonProps {
    count? : number
    baseColor?: string
    highlightColor?: string
}

const SkeletonLoad: React.FC<SkeletonProps> = ({
    count=2,
    baseColor='#f3f3f3',
    highlightColor='#96F19A'
}) => {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        <Skeleton count={count} />
    </SkeletonTheme>
  );
};

export default SkeletonLoad;
