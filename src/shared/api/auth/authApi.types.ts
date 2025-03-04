export type Login = {
  email: string
  password: string
}
export type LoginAnswer = {
  accessToken: string
}

export type ResendEmail = { email: string; baseUrl: string }

export type GoogleAuthResponse = {
  accessToken: 'string'
  email: 'string'
}

export type CheckRecoveryCodeResponse = {
  email: string
}
