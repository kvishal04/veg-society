export interface ErrorCode {
    status: number
    data : {
        message: string
        success: boolean
        type: string
    }
}

export interface DataCode {
    message: string
    success: boolean
    data : any
}