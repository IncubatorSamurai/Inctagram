import Image from 'next/image'
import s from './FilterCard.module.scss'
import { Typography } from '../typography'

type Props = {
  src: string
}
export const FilterCard = ({ src }: Props) => {
  return (
    <div className={s.container}>
      <Image className={s.image} src={src} width={100} height={100} alt="" />
      <Typography variant={'regular_text_16'}>Clarendon</Typography>
    </div>
  )
}
