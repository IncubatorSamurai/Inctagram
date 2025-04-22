import { Typography } from '@/shared/ui/typography'
import s from './PostDescription.module.scss'
import { Button } from '@/shared/ui/button'

export type PostDescriptionProps = {
  description: string
  isExpanded: boolean
  onToggleExpand: () => void
}

const TEXT_CUT = 40
const TEXT_LENGTH = 40
export const PublicPostDescription = ({
  description,
  isExpanded,
  onToggleExpand,
}: PostDescriptionProps) => (
  <div className={s.public_post_description}>
    {description && (
      <Typography
        variant="regular_text_14"
        className={`${s.public_post_text} ${isExpanded ? s.expanded_text : ''}`}
      >
        {isExpanded ? description : description.slice(0, TEXT_CUT) + '...'}
      </Typography>
    )}
    {description.length > TEXT_LENGTH && (
      <Button onClick={onToggleExpand} className={s.public_post_btn} variant={'text'}>
        {isExpanded ? 'Hide' : 'Show more'}
      </Button>
    )}
  </div>
)
