import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query/react'

import { SerializedError } from '@reduxjs/toolkit'
import {  BaseResponse } from '@/shared/types/auth'

export const handleError = (
  result: QueryReturnValue<BaseResponse, FetchBaseQueryError | SerializedError, FetchBaseQueryMeta>
): string => {
  if (result.error) {
    // Если ошибка является FetchBaseQueryError
    if ('status' in result.error) {
      switch (result.error.status) {
        case 400:
        case 500:
          return (
            (result.error.data as BaseResponse)?.messages?.[0]?.message || 'Server error occurred'
          )

        case 403:
          return 'Access denied (403). Please check permissions.'

        case 'FETCH_ERROR':
        case 'PARSING_ERROR':
        case 'CUSTOM_ERROR':
          return result.error.error || 'A network error occurred'

        default:
          return JSON.stringify(result.error)
      }
    }

    // Если ошибка является SerializedError
    if ('message' in result.error) {
      return result.error.message || 'An unknown error occurred'
    }
  }

  // Проверяем данные, если ошибка не была найдена
  if (result.data && result.data.statusCode !== undefined && result.data.statusCode !== 200) {
    return result.data.messages?.[0]?.message || 'An unknown error occurred'
  }

  // По умолчанию
  return 'An unknown error occurred'
}
