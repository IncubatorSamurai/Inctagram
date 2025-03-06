export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

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

export type RecoveryPassword = {
  email: string
  recaptcha: string
  baseUrl: string
}

export type CheckRecoveryCodeResponse = {
  email: string
}
