import { Typography } from '@/shared/ui/typography'
import s from '@/features/publicPosts/ui/PublicPostsList/PublicPostsList.module.scss'
import { Button } from '@/shared/ui/button'

export type PostDescriptionProps = {
  description: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const TEXT_CUT = 68
const TEXT_LENGTH = 75
export const PublicPostDescription = ({
  description,
  isExpanded,
  onToggleExpand,
}: PostDescriptionProps) => (
  <>
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
  </>
)
