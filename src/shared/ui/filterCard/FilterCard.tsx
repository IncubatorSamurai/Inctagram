import Image from 'next/image'
import s from './FilterCard.module.scss'
import { Typography } from '../typography'

type Props = {
  src: string
  title: string
}

export const FilterCard = ({ src, title }: Props) => {
  return (
    <>
      <Image className={s.image} src={src} width={100} height={100} alt="" />
      <Typography variant={'regular_text_16'}>{title}</Typography>
    </>
  )
}
