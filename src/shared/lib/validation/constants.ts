export const passwordValidation = {
  MIN_LENGTH: 6,
  MAX_LENGTH: 20,
  REGEX:
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*["!#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])(?!.*[А-Яа-я]).+$/,
  ERROR_MESSAGES: {
    PATTERN:
      'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _` { | } ~',
    MISMATCH: 'The passwords must match',
  },
} as const

export const nameValidation = {
  MIN_LENGTH: 6,
  MAX_LENGTH: 30,
  REGEX: /^[a-zA-Z0-9_-]+$/,
  ERROR_MESSAGES: {
    PATTERN: 'Name must contain a-z A-Z 0-9 _ - ',
    MISMATCH: 'The passwords must match',
  },
} as const

export const agreeValidation = {
  MISMATCH: 'The agree must checked',
} as const

export const nameSettingValidation = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 50,
  REGEX: /^[A-Za-zА-Яа-яЁё\s-]+$/,
  ERROR_MESSAGES: {
    PATTERN: 'Name must contain A-Z a-z or А-Я; а-я',
  },
} as const
