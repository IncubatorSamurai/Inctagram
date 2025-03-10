import React, { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

export const PlayCircleIcon = (props: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="play-circle_2">
        <path id="Vector" d="M11.5 14.6L14.31 12L11.5 9.39999V14.6Z" fill="currentColor" />
        <path
          id="Vector_2"
          d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM16 13.18L12.36 16.55C12.042 16.8378 11.6289 16.9981 11.2 17C10.962 16.9994 10.7268 16.9483 10.51 16.85C10.2151 16.7307 9.96238 16.5262 9.78426 16.2625C9.60613 15.9989 9.51065 15.6882 9.51 15.37V8.63C9.51065 8.31184 9.60613 8.00109 9.78426 7.73747C9.96238 7.47384 10.2151 7.26931 10.51 7.15C10.8138 7.0132 11.1512 6.9687 11.4801 7.02204C11.809 7.07537 12.115 7.22419 12.36 7.45L16 10.82C16.1637 10.9699 16.2944 11.1522 16.3838 11.3554C16.4733 11.5585 16.5195 11.778 16.5195 12C16.5195 12.222 16.4733 12.4415 16.3838 12.6446C16.2944 12.8478 16.1637 13.0301 16 13.18Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
