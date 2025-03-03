export type ErrorMessages = {
  message: string
  field: string
}

export type ErrorResponse<T = ErrorMessages[]> = {
  data: {
    statusCode: number
    messages: T
    error: string
  }
}
export interface BaseResponse {
  statusCode: number
  messages: ErrorMessages[]
  error?: string
}
