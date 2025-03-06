import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { ReactNode } from 'react'
import { locales } from '@/shared/types/locale'
import { Header } from '@/widgets/header'
import { PATH } from '@/shared/config/routes'
import { AuthProvider } from '@/app/_providers'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const { locale } = await params
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as locales)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started

  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>
        <Header headerTitle={'Inctagram'} link={PATH.HOME} />

        {children}
      </AuthProvider>
    </NextIntlClientProvider>
  )
}
