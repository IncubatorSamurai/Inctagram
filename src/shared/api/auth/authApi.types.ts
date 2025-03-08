export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

export type LoginArgs = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
}

export type ResendEmailArgs = {
  email: string
  baseUrl: string
}

export type GoogleLoginArgs = {
  redirectUrl: string
  code: string
}

export type GoogleLoginResponse = {
  accessToken: 'string'
  email: 'string'
}

export type PasswordRecoveryArgs = {
  email: string
  recaptcha: string
  baseUrl: string
}

export type CheckRecoveryCodeResponse = {
  email: string
}

export type CreateNewPasswordArgs = {
  newPassword: string
  recoveryCode: string
}

export type ResendRecoveryCodeArgs = {
  email: string
  baseUrl: string
}
