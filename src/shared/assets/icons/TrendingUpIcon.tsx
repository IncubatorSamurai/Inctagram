import React, { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

export const TrendingUpIcon = (props: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        id="Vector"
        d="M21 7C21.0095 6.93032 21.0095 6.85968 21 6.79C20.9913 6.73129 20.9745 6.67407 20.95 6.62C20.9236 6.57113 20.8935 6.52433 20.86 6.48C20.8219 6.41675 20.7748 6.35947 20.72 6.31L20.6 6.24C20.5423 6.19696 20.4782 6.16321 20.41 6.14H20.21C20.149 6.08099 20.0779 6.03356 20 6H15C14.7348 6 14.4804 6.10536 14.2929 6.29289C14.1053 6.48043 14 6.73478 14 7C14 7.26522 14.1053 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H17.83L13.83 12.71L9.50999 10.14C9.30537 10.0183 9.06405 9.97359 8.82941 10.0139C8.59478 10.0542 8.38223 10.177 8.22999 10.36L3.22999 16.36C3.14579 16.461 3.08235 16.5777 3.0433 16.7033C3.00426 16.8289 2.99038 16.961 3.00245 17.092C3.01453 17.2229 3.05233 17.3503 3.11368 17.4666C3.17503 17.5829 3.25873 17.6861 3.35999 17.77C3.5399 17.9191 3.76634 18.0005 3.99999 18C4.1469 18.0002 4.29206 17.9681 4.42514 17.9059C4.55823 17.8437 4.67597 17.7529 4.76999 17.64L9.21999 12.3L13.49 14.86C13.6925 14.9801 13.9309 15.0249 14.1633 14.9865C14.3956 14.9481 14.6069 14.8289 14.76 14.65L19 9.7V12C19 12.2652 19.1053 12.5196 19.2929 12.7071C19.4804 12.8946 19.7348 13 20 13C20.2652 13 20.5196 12.8946 20.7071 12.7071C20.8946 12.5196 21 12.2652 21 12V7Z"
        fill="currentColor"
      />
    </svg>
  )
}
