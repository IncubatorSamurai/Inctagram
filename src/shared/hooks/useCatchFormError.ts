import { ErrorResponse } from '../types/auth'
import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'

export const catchFormError = <T extends FieldValues>(
  err: ErrorResponse,
  setError: UseFormSetError<T>
) => {
  if (err?.data?.statusCode === 400) {
    const { field, message } = err.data.messages[0]

    if (field === 'userName') {
      setError('name' as FieldPath<T>, {
        type: 'manual',
        message: message,
      })
      return
    }

    if (field === 'email') {
      setError('email' as FieldPath<T>, {
        type: 'manual',
        message: message,
      })
      return
    }
  }
}
