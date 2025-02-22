import { useTranslations } from 'next-intl'

export default function TestPage() {
  const t = useTranslations('testSection')
  return <h1>{t('test')}</h1>
}
