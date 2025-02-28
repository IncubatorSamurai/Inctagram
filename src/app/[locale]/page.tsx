import { useTranslations } from 'next-intl'
import { Button } from '@/shared/ui/button'
import { Link } from '@/i18n/routing'

export default function TestPage() {
  const t = useTranslations('testSection')
  return (
    <h1>
      {t('test')}
      <Button asChild>
        <Link href={'/auth/signin'}>Link</Link>
      </Button>
    </h1>
  )
}
