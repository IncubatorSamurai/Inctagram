type ErrorMessages = {
  message: string
  field: string
}

export type GoogleAuthResponse = {
  accessToken: 'string'
  email: 'string'
}

export type ErrorResponse = {
  statusCode: number
  messages: ErrorMessages[]
  error: string
}