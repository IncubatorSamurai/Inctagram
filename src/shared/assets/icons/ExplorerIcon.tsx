import React, { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

export const ExplorerIcon = (props: Props) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M34.0457 8.06696C37.3701 -0.559047 30.9132 0.0443044 30.9132 0.0443044C26.7705 0.0443044 21.5918 3.81713 21.5918 3.81713C21.5918 3.81713 15.4149 2.15284 9.23745 5.88861C2.50531 10.1794 2.72749 17.7993 2.72749 17.7993C8.20167 9.95752 15.8216 6.77638 15.8216 6.77638V7.29423C4.57685 14.9839 1.91356 26.2328 1.24777 28.5261C0.581907 30.8192 1.02586 35.9648 5.76063 35.9648C10.4954 35.9648 15.3038 32.151 15.3038 32.151C15.3038 32.151 16.3395 32.3731 19.1505 32.3731C30.9872 32.3731 33.7981 21.942 33.7981 21.942H23.2931C23.2931 21.942 22.5534 25.3449 18.7808 25.3449C13.6023 25.3449 13.898 19.9446 13.898 19.9446H33.9463C34.908 6.03669 22.7755 4.03932 22.7755 4.03932C22.7755 4.03932 27.063 1.00625 30.7652 1.00625C36.6329 1.00625 33.8581 7.87972 33.8581 7.87972L34.0457 8.06696ZM14.7166 31.9971C14.7166 31.9971 7.49124 36.3819 4.24786 33.3438C2.5103 30.3054 5.33398 26.0026 5.33398 26.0026C5.33398 26.0026 7.72313 30.4333 14.7166 31.9971ZM23.4074 15.2116H13.8726C13.8726 15.2116 13.752 10.5651 18.7606 10.5651C23.5976 10.565 23.4074 15.2116 23.4074 15.2116Z"
        fill="currentColor"
      />
    </svg>
  )
}
