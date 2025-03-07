export const passwordValidation = {
  MIN_LENGTH: 6,
  MAX_LENGTH: 20,
  REGEX: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*["!#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]).+$/,
  ERROR_MESSAGES: {
    PATTERN:
      'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _` { | } ~',
    MISMATCH: 'The passwords must match',
  },
} as const