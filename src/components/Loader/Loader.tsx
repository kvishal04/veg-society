"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust the path if necessary

export default function Loader() {
  const { isLoading } = useSelector((state: RootState) => state.loader); // Get loading state from Redux

  if (!isLoading) return null; // If not loading, don't render the loader

  return (
    <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0 bg-gray-800 bg-opacity-50 z-50">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
