import toast from "react-hot-toast";
import { format, parseISO } from "date-fns";

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


export const showToast = (message: string, type: string = '') => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.custom(message, {className: 'textWhite' })
        break;
      default:
        toast(message); // Default toast
        break;
    }
};

export const checkEmail = (value: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value) 

}

export const checkPassword = (value: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(value);
}


export const ToastMessage  = {
  SHOW_SUCCESS : "success",
  SHOW_ERROR : "error",
  SHOW_WARNING : "warning",
  SHOW_DEFAULT : ""
}

export const returnLocalDate = (utcDate: string , formatStr: string = 'hh:mma dd/MM/yyyy') => {
    return format(parseISO(utcDate), formatStr);
  };