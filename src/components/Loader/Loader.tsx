"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust the path if necessary

export default function Loader() {
  const { isLoading } = useSelector((state: RootState) => state.loader); // Get loading state from Redux

  if (!isLoading) return null; // If not loading, don't render the loader

  return (
    <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0 bg-gray-800 bg-opacity-50 z-50">
      <div className="loader"></div>
    </div>
  );
}
