import React, { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

export const CropIcon1x1 = (props: Props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
