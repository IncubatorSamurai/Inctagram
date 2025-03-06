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

export type CheckRecoveryCodeResponse = {
  email: string
}

export type RegistrationRequest = {
  userName: string
  email: string
  password: string
  baseUrl: string
}
