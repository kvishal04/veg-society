import { errorCode } from "@/interface/error";

// utils/CustomError.ts
export class ApiError extends Error {
    data: errorCode
    statusCode: number

    constructor(data: errorCode) {
      super(data?.data.message);
      this.statusCode = data?.status;
      this.data = data;
  
      Object.setPrototypeOf(this, ApiError.prototype);
    }
  }
  