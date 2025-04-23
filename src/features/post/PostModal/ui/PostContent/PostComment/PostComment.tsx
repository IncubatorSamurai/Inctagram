import { Typography } from '@/shared/ui/typography'
import s from './PostComment.module.scss'
import { HeartOutlineIcon } from '@/shared/assets/icons/HeartOutlineIcon'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
export const PostComment = () => {
  const userName = 'URLProfiele:'
  return (
    <div className={s.root}>
      <div className={s.comment}>
        <div className={s.imgUser}>
          <NoAvatar />
        </div>
        <div className={s.userNameAndText}>
          <Typography variant="bold_text_14">
            {userName}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur cum maiores nisi
            veritatis corporis, modi numquam cupiditate quas alias, possimus nobis atque illum dolor
            doloribus blanditiis illo sapiente natus nemo?
          </Typography>
        </div>
        <div className={s.like}>
          <HeartOutlineIcon width={16} height={16} />
        </div>
      </div>
      <div className={s.sideInfo}>when added likes count and can answer</div>
    </div>
  )
}
