import { ErrorData } from "@/interface/error";

// utils/CustomError.ts
export class ApiError extends Error {
    data: ErrorData
    statusCode: number
    globalMessage: string

    constructor(error: ErrorData, status: number) {
      super(error.message);
      this.statusCode = status;
      this.globalMessage = error.message;
      this.data = error.data;
  
      Object.setPrototypeOf(this, ApiError.prototype);
    }
  }
  