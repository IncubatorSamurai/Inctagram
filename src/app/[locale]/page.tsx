import { useTranslations } from 'next-intl'

export default function TestPage() {
  const t = useTranslations('testSection')
  return (
    <div>
      <h1>{t('test')}</h1>
    </div>
  )
}
