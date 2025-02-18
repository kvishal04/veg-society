
export interface ErrorData {
    message: string
    success: boolean
    type: string
    data?: any
}
export interface ErrorCode {
    data: {
        data : ErrorData
    }   
    status: number
   
}

export interface DataCode {
    message: string
    success: boolean
    data : any
}