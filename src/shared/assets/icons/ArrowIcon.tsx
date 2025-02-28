import { SVGProps } from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
} & SVGProps<SVGSVGElement>

export const ArrowIcon = (props: Props) => {
  return (
    <svg
      className={clsx(props.className)}
      {...props}
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className={'arrow_border'} d="M0 8L16 8L8 0L0 8Z" fill="currentColor" />
      <path className={'arrow_fill'} d="M0 9.5L16 9.5L8 1.5L0 9.5Z" fill="currentColor" />
    </svg>
  )
}
