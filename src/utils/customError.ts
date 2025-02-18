import { ErrorCode } from "@/interface/error";

// utils/CustomError.ts
export class ApiError extends Error {
    data: ErrorCode
    statusCode: number

    constructor(data: ErrorCode) {
      super(data?.data.message);
      this.statusCode = data?.status;
      this.data = data;
  
      Object.setPrototypeOf(this, ApiError.prototype);
    }
  }
  