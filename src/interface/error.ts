export interface errorCode {
    status: number
    data : {
        message: string
        success: boolean
        type: string
    }
}

export interface dataCode {
    message: string
    success: boolean
    data : any
}