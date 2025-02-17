"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Default styles for all toasts
        style: {
          background: "#333",
          color: "#fff",
          fontSize: "14px",
          borderRadius: "8px",
          padding: "10px",
        },
        success: {
          style: { background: "#4CAF50" }, // Green for success
        },
        error: {
          style: { background: "#FF4D4D" }, // Red for error
        },
      }}
    />
  );
};

export default ToastProvider;
