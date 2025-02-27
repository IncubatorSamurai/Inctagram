export type ErrorType = {
  data: { statusCode: number; messages: string; error: string }
}

type ErrorMessagesType = {
  message: string
  field: string
}
export type ResendEmailErrorType = {
  data: ErrorType['data'] & { messages: ErrorMessagesType[] }
}
