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
