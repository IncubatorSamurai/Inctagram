export type Error = {
  data: { statusCode: number; messages: string; error: string }
}

type ErrorMessages = {
  message: string
  field: string
}
export type ResendEmailError = {
  data: Error['data'] & { messages: ErrorMessages[] }
}
