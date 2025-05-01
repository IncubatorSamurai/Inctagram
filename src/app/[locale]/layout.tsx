import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { ReactNode } from 'react'
import { locales } from '@/shared/types/locale'
import { Header } from '@/widgets/header'
import { AuthProvider } from '@/app/_providers'
import s from './layout.module.scss'
import LayoutLoggedIn from '@/app/_providers/layoutLoggedIn/layoutLoggedIn'
import { ToastContainer } from 'react-toastify'
import { NotificationsProvider } from '../_providers/NotificationsProvider/NotificationsProvider'

export default async function LocaleLayout({
  children,
  params,
  modal,
}: {
  children: ReactNode
  params: { locale: string }
  modal: ReactNode
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
        <NotificationsProvider>
          <Header headerTitle={'Inctagram'} />
          <div className={s.container}>
            <LayoutLoggedIn>
              {children} <ToastContainer />
            </LayoutLoggedIn>
          </div>
          {modal}
        </NotificationsProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  )
}
