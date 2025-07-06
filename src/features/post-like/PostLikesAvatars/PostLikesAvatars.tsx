import { useGetPostLikesQuery } from '@/shared/api/post/likes/postLikeApi'
import s from './PostLikesAvatars.module.scss'
import { NoAvatar } from '@/shared/ui/noAvatar/NoAvatar'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography'

type Props = {
  id: number
}
export const PostLikesAvatars = ({ id }: Props) => {
  const { data } = useGetPostLikesQuery(id , { skip: !id })

  const transformedArray = [...(data?.items ?? [])].reverse().slice(0, 3)
  return (
    <div className={s.container}>
      <div className={s.row}>
        {transformedArray.map(item => (
          <div key={item.id}>
            {!item?.avatars.length ? (
              <NoAvatar className={s.avatar} />
            ) : (
              <Image
                className={s.avatar}
                src={item?.avatars[1].url}
                alt="avatarOwner"
                width={24}
                height={24}
              />
            )}
          </div>
        ))}
      </div>
      <Typography variant="medium_text_14">
        {data?.totalCount} <b>&quot;Like&quot;</b>{' '}
      </Typography>
    </div>
  )
}
