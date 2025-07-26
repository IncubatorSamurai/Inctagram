import { useFollowMutation, useUnfollowMutation } from '@/shared/api/users/usersApi'
import { PersonAddOutlineIcon } from '@/shared/assets/icons/PersonAddOutlineIcon'
import { PersonRemoveOutlineIcon } from '@/shared/assets/icons/PersonRemoveOutlineIcon'
import { Button } from '@/shared/ui/button'
import { Typography } from '@/shared/ui/typography'
import { useTranslations } from 'next-intl'
import { toast } from 'react-toastify'

type Props = {
  userId: number
  userName: string
  isFollowing: boolean
  variant?: 'icon'
  className?: string
}

export const FollowButton = ({ userId, userName, isFollowing, variant, className }: Props) => {
  const t = useTranslations('follow')

  const [follow, { isLoading: isFollowLoading }] = useFollowMutation()
  const [unfollow, { isLoading: isUnfollowLoading }] = useUnfollowMutation()

  const isLoading = isFollowLoading || isUnfollowLoading

  const handleFollow = async () => {
    follow({ selectedUserId: userId })
      .then(() => toast.success(`${t('followSuccessText')} ${userName}`))
      .catch(() => toast.error(`${t('followErrorText')} ${userName}`))
  }

  const handleUnfollow = () => {
    unfollow({ userId: userId })
      .then(() => toast.success(`${t('unfollowSuccessText')} ${userName}`))
      .catch(() => toast.error(`${t('unfollowErrorText')} ${userName}`))
  }

  const getButtonProps = () => {
    const baseProps = {
      disabled: isLoading,
      onClick: isFollowing ? handleUnfollow : handleFollow,
    }

    if (variant === 'icon') {
      return {
        ...baseProps,
        variant,
        children: (
          <>
            {isFollowing ? <PersonRemoveOutlineIcon /> : <PersonAddOutlineIcon />}
            <Typography variant="regular_text_14">
              {isFollowing ? t('unfollow') : t('follow')}
            </Typography>
          </>
        ),
      }
    }

    return {
      ...baseProps,
      variant: isFollowing ? 'outline' : 'primary',
      children: isFollowing ? t('unfollow') : t('follow'),
    } as const
  }

  return <Button className={className} {...getButtonProps()} />
}
