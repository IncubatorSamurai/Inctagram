import React, { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

export const CropIcon4x5 = (props: Props) => {
  return (
    <svg
      width="18"
      height="26"
      viewBox="0 0 18 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="1" y="1" width="16" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
