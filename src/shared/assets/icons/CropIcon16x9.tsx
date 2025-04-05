import React, { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

export const CropIcon16x9 = (props: Props) => {
  return (
    <svg
      width="26"
      height="20"
      viewBox="0 0 26 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="25"
        y="1"
        width="18"
        height="24"
        rx="2"
        transform="rotate(90 25 1)"
        stroke="#8D9094"
        strokeWidth="2"
      />
    </svg>
  )
}
