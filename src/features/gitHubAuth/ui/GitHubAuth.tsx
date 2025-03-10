'use client'
import { GitHubIcon } from '@/shared/assets/icons/GitHubIcon'
import { Button } from '@/shared/ui/button'

export const GitHubAuth = () => {
  const onClickHandler = () => {
    const redirectUrl = encodeURIComponent(window.location.origin + '/auth')
    window.location.assign(`${process.env.NEXT_PUBLIC_GITHUB_URL}?redirect_url=${redirectUrl}`)
  }

  return (
    <Button variant={'icon'} onClick={onClickHandler}>
      <GitHubIcon width={36} height={36} color="var(--color-light-100)" />
    </Button>
  )
}
