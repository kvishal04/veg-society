import toast from "react-hot-toast";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://vegetariansociety.newsoftdemo.info/api/v1/"; // Default fallback

export const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && defaultValue !== undefined) {
    return defaultValue;
  } else if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};


export const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast(message); // Default toast
        break;
    }
  };