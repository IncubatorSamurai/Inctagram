import Image from 'next/image'
import s from './Follower.module.scss'
import { Typography } from '@/shared/ui/typography'
import { Button } from '@/shared/ui/button'
type Props = {
    avatarSrc: string
    profileUrl: string
}

export const Follower = ({avatarSrc,profileUrl}: Props) => {
    return (
        <div>
        <div>
            <Image src={avatarSrc} className={s.avatar} width={72} height={48} alt={'avatar'}  />
            <Typography>{profileUrl}</Typography>
        </div>
        <div>
            <Button>Follow</Button>
            <Button>Delete</Button>
        </div>
        </div>
        
    )
}